
export const VERSION = ''
export const BASE_URL = import.meta.env.VITE_API_BASE_URL
export const API_BASE_URL = `${BASE_URL}/api/v1`

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