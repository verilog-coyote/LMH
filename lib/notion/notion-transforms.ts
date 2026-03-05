import type { NotionTimelinePage, NotionPropertyValue } from "./notion-client"
import type { TimelineEvent } from "@/lib/timeline-data"

function getProperty(
  properties: Record<string, NotionPropertyValue>,
  name: string
): string | number | boolean | null {
  const prop = properties[name]
  if (!prop) return null

  switch (prop.type) {
    case "title":
      return prop.title?.[0]?.plain_text || null
    case "rich_text": {
      if (!prop.rich_text || prop.rich_text.length === 0) return null
      return prop.rich_text.map((t) => t.plain_text).join("") || null
    }
    case "select":
      return prop.select?.name || null
    case "number":
      return prop.number ?? null
    case "checkbox":
      return prop.checkbox ?? false
    default:
      return null
  }
}

const VALID_CATEGORIES = ["land", "organization", "cultural", "restoration"] as const
type Category = (typeof VALID_CATEGORIES)[number]

function normalizeCategory(value: string | null): Category {
  if (!value) return "cultural"
  const lower = value.toLowerCase()
  if (VALID_CATEGORIES.includes(lower as Category)) return lower as Category
  return "cultural"
}

export function transformToTimelineEvent(
  page: NotionTimelinePage
): TimelineEvent | null {
  const { properties } = page

  const title = getProperty(properties, "Title") as string | null
  const year = getProperty(properties, "Year") as string | null

  if (!title || !year) return null

  const category = normalizeCategory(
    getProperty(properties, "Category") as string | null
  )

  return {
    id: page.id,
    year,
    title,
    description: (getProperty(properties, "Description") as string) || "",
    category,
    location: (getProperty(properties, "Location") as string) || "",
  }
}
