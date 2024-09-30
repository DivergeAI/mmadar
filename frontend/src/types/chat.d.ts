import exp from "constants";

export type CONTROLS = {
    title: string;
    icon: JSX.Element;
    active?: boolean;
    info?: any;
    onClick: () => void;
    isLastMessage ?: boolean
}

export interface FileItem {
    type?: string;
    file?: string;
    id?: string | null;
    url?: string;
    name?: string;
    collection_name?: string;
    status?: string;
    size?: number;
    error?: string;
   
  }

  export interface Source {
    collection_name: string;
    filename: string;
    name: string;
    status: string;
    timestamp: number;
    type: string;
    user_id: string;
    title: string;
    content : {
        tags : Array<{name:string}>;
    }
  }

  export interface Metadata {
    file_id : string;
    name : string;
    source : string;
    start_index : number;
    page : number;
  }

  export interface Citation {
    id : string;
    document : string[];
    source : Source;
    metadata : Metadata[];
}