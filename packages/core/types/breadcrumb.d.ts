import { BreadcrumbType } from './common'

declare class Breadcrumb {
  public message: string;
  public metadata: { [key: string]: any };
  public type: BreadcrumbType;
  public timestamp: Date;

  constructor (message: string, metadata: Breadcrumb["metadata"], type: Breadcrumb['type'], timestamp?: Date)
  toJSON(): {
    type: Breadcrumb['type']
    name: Breadcrumb['message']
    timestamp: Breadcrumb['timestamp']
    metaData: Breadcrumb['metadata']
  }
}

export default Breadcrumb
