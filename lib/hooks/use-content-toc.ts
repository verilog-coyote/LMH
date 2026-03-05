import { useMemo } from "react"
import type { ExtendedRecordMap } from "notion-types"

export interface TOCSection {
  id: string
  label: string
  level: number
}

export interface TOCNode extends TOCSection {
  children: TOCNode[]
}

function buildNestedTOC(sections: TOCSection[]): TOCNode[] {
  const result: TOCNode[] = []
  const stack: TOCNode[] = []

  for (const section of sections) {
    const node: TOCNode = { ...section, children: [] }

    while (stack.length > 0 && stack[stack.length - 1].level >= section.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      result.push(node)
    } else {
      stack[stack.length - 1].children.push(node)
    }

    stack.push(node)
  }

  return result
}

function extractNotionHeadings(
  recordMap: ExtendedRecordMap | undefined
): TOCSection[] {
  if (!recordMap?.block) return []

  const headings: {
    blockId: string
    title: string
    level: number
    index: number
  }[] = []

  const blockIds = Object.keys(recordMap.block)

  for (let i = 0; i < blockIds.length; i++) {
    const blockId = blockIds[i]
    const block = recordMap.block[blockId]
    const blockValue = (
      block as {
        value?: {
          type?: string
          properties?: { title?: string[][] }
        }
      }
    )?.value
    if (!blockValue) continue

    const { type, properties } = blockValue

    if (
      type === "header" ||
      type === "sub_header" ||
      type === "sub_sub_header"
    ) {
      const title = properties?.title?.[0]?.[0] || ""
      if (title) {
        const level =
          type === "header" ? 1 : type === "sub_header" ? 2 : 3
        headings.push({ blockId, title, level, index: i })
      }
    }
  }

  headings.sort((a, b) => a.index - b.index)

  return headings.map(({ blockId, title, level }) => {
    const id = blockId.replace(/-/g, "")
    return { id, label: title, level }
  })
}

export function useContentTOC(recordMap?: ExtendedRecordMap): {
  sections: TOCSection[]
  nestedSections: TOCNode[]
  sectionIds: string[]
  showTOC: boolean
} {
  const sections = useMemo(
    () => extractNotionHeadings(recordMap),
    [recordMap]
  )

  const nestedSections = useMemo(() => buildNestedTOC(sections), [sections])
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const showTOC = sections.length >= 2

  return { sections, nestedSections, sectionIds, showTOC }
}
