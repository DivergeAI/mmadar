export type AdvanceModel ={
    seed: number;
    stopSequence: string;
    temperature: number;
    mirostat: number;
    mirostatEta: number;
    mirostatTau: number;
    topK: number;
    topP: number;
    minP: number;
    frequencyPenalty: number;
    repeatLastN: number;
    tfsZ: number;
    contextLength: number;
    batchSize: number;
    tokenToKeep: number;
    maxTokens: number;
    useMmap: boolean;
    useMlock: boolean;
    useThread: number;
    customStates: {
      [key: string]: boolean;
    };
  }