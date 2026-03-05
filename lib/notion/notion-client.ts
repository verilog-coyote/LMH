import { Client } from "@notionhq/client"
import { NotionAPI } from "notion-client"
import type { ExtendedRecordMap } from "notion-types"

interface PropertyFilter {
  property: string
  checkbox?: { equals: boolean }
}

type DataSourceFilter =
  | PropertyFilter
  | { and: PropertyFilter[] }
  | { or: PropertyFilter[] }

interface DataSource {
  id: string
  name: string
}

interface DatabaseResponse {
  object: "database"
  id: string
  data_sources?: DataSource[]
}

interface DataSourceQueryResponse {
  object: "list"
  results: NotionTimelinePage[]
  has_more: boolean
  next_cursor: string | null
}

export interface NotionPropertyValue {
  type: string
  title?: Array<{ plain_text: string }>
  rich_text?: Array<{ plain_text: string }>
  select?: { name: string }
  number?: number
  checkbox?: boolean
  [key: string]: unknown
}

export interface NotionTimelinePage {
  id: string
  properties: Record<string, NotionPropertyValue>
}

export class TimelineNotionClient {
  private readonly client: Client | null = null
  private readonly notionAPI = new NotionAPI()
  private readonly databaseId: string | undefined
  private readonly dataSourceCache: Map<string, string> = new Map()

  constructor() {
    const token = process.env.NOTION_TOKEN
    this.databaseId = process.env.NOTION_TIMELINE_DATABASE_ID

    if (token) {
      this.client = new Client({
        auth: token,
        notionVersion: "2025-09-03",
      })
    }
  }

  async getPage(pageId: string): Promise<ExtendedRecordMap> {
    return this.notionAPI.getPage(pageId)
  }

  isConfigured(): boolean {
    return !!(this.client && this.databaseId)
  }

  private async getDataSourceId(databaseId: string): Promise<string | null> {
    if (!this.client) return null
    if (this.dataSourceCache.has(databaseId)) {
      return this.dataSourceCache.get(databaseId)!
    }

    try {
      const response = (await this.client.request({
        method: "get",
        path: `databases/${databaseId}`,
      })) as DatabaseResponse

      const dataSourceId = response.data_sources?.[0]?.id
      if (dataSourceId) {
        this.dataSourceCache.set(databaseId, dataSourceId)
        return dataSourceId
      }
      return null
    } catch (error) {
      console.error(`Failed to get data source for database ${databaseId}:`, error)
      return null
    }
  }

  async queryTimeline(): Promise<NotionTimelinePage[]> {
    if (!this.client || !this.databaseId) return []

    try {
      const dataSourceId = await this.getDataSourceId(this.databaseId)
      if (!dataSourceId) {
        console.error(`No data source found for database ${this.databaseId}`)
        return []
      }

      const filter: DataSourceFilter = {
        property: "Published",
        checkbox: { equals: true },
      }

      const response = (await this.client.request({
        method: "post",
        path: `data_sources/${dataSourceId}/query`,
        body: { filter },
      })) as DataSourceQueryResponse

      return response.results
    } catch (error) {
      console.error("Failed to query timeline database:", error)
      return []
    }
  }
}

export const timelineNotionClient = new TimelineNotionClient()
