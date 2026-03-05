import { timelineNotionClient } from "./notion-client"
import { transformToTimelineEvent } from "./notion-transforms"
import type { TimelineEvent } from "@/lib/timeline-data"
import type { ExtendedRecordMap } from "notion-types"

export type PageContentMap = Record<string, ExtendedRecordMap>

export async function getAllTimelineEvents(): Promise<TimelineEvent[]> {
  try {
    if (!timelineNotionClient.isConfigured()) return []

    const pages = await timelineNotionClient.queryTimeline()
    const events = pages
      .map((page) => transformToTimelineEvent(page))
      .filter(Boolean) as TimelineEvent[]
    events.sort((a, b) => parseInt(a.year) - parseInt(b.year))
    return events
  } catch (error) {
    console.error("Failed to fetch timeline events:", error)
    return []
  }
}

export async function getAllPageContent(
  events: TimelineEvent[]
): Promise<PageContentMap> {
  const contentMap: PageContentMap = {}

  const results = await Promise.allSettled(
    events.map(async (event) => {
      const recordMap = await timelineNotionClient.getPage(event.id)
      return { id: event.id, recordMap }
    })
  )

  for (const result of results) {
    if (result.status === "fulfilled") {
      contentMap[result.value.id] = result.value.recordMap
    }
  }

  return contentMap
}
