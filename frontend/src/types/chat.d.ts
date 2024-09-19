export type CONTROLS = {
    title: string;
    icon: JSX.Element;
    active?: boolean;
    info?: any;
    onClick: () => void;
    isLastMessage ?: boolean
}

export interface FileItem {
    type: string;
    file: string;
    id: string | null;
    url: string;
    name: string;
    collection_name: string;
    status: string;
    size: number;
    error: string;
  }