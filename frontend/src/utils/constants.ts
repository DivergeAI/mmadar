
export const VERSION = 'api/v1'
export const BASE_URL = import.meta.env.VITE_API_BASE_URL
export const API_BASE_URL = `${BASE_URL}/${VERSION}`
export const AUDIO_API_BASE_URL = `${BASE_URL}/audio/api/v1`;
export const OLLAMA_API_BASE_URL = `${BASE_URL}/ollama`
export const RAG_API_BASE_URL = `${BASE_URL}/rag/api/v1`;


export const TITLE_GENERATION_PROMPT: string = "Here is the query:\n{{prompt:middletruncate:8000}}\n\nCreate a concise, 3-5 word phrase with an emoji as a title for the previous query. Suitable Emojis for the summary can be used to enhance understanding but avoid quotation marks or special formatting. RESPOND ONLY WITH THE TITLE TEXT.\n\nExamples of titles:\n📉 Stock Market Trends\n🍪 Perfect Chocolate Chip Recipe\nEvolution of Music Streaming\nRemote Work Productivity Tips\nArtificial Intelligence in Healthcare\n🎮 Video Game Development Insights"

export const SEARCH_QUERY_GENERATION_PROMPT: string = "You are tasked with generating web search queries. Give me an appropriate query to answer my question for google search. Answer with only the query. Today is {{CURRENT_DATE}}.\n        \nQuestion:\n{{prompt:end:4000}}"

export const BANNERS_OPTIONS: string[] = ['Info', 'Warning', 'Error', 'Success']

export const SPEACH_TO_TEXT_ENGINE = [
  'Whisper (Local)',
  'OpenAI',
  'Web API'
]
export const TEXT_TO_SPEACH_ENGINE = [
  'ElevenLabs',
  'OpenAI',
  'Web API'
]

export const IMAGE_GENERATION_ENGINE = [
  'Default (Automatic1111)',
  'CompfyUI',
  'OpenAI (DALL-E)',
]

export const themeOptions = [
  '☀️ Light',
  '🌑 Dark',
  '⚙️ System',
  '🌃 OLED Dark',
  '🌷 Her',
]

export const SUPPORTED_FILE_TYPE = [
	'application/epub+zip',
	'application/pdf',
	'text/plain',
	'text/csv',
	'text/xml',
	'text/html',
	'text/x-python',
	'text/css',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/octet-stream',
	'application/x-javascript',
	'text/markdown',
	'audio/mpeg',
	'audio/wav'
];

export const SUPPORTED_FILE_EXTENSIONS = [
	'md',
	'rst',
	'go',
	'py',
	'java',
	'sh',
	'bat',
	'ps1',
	'cmd',
	'js',
	'ts',
	'css',
	'cpp',
	'hpp',
	'h',
	'c',
	'cs',
	'htm',
	'html',
	'sql',
	'log',
	'ini',
	'pl',
	'pm',
	'r',
	'dart',
	'dockerfile',
	'env',
	'php',
	'hs',
	'hsc',
	'lua',
	'nginxconf',
	'conf',
	'm',
	'mm',
	'plsql',
	'perl',
	'rb',
	'rs',
	'db2',
	'scala',
	'bash',
	'swift',
	'vue',
	'svelte',
	'doc',
	'docx',
	'pdf',
	'csv',
	'txt',
	'xls',
	'xlsx',
	'pptx',
	'ppt',
	'msg'
];