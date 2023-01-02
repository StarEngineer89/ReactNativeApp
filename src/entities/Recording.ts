interface Recording {
  _id: string;
  category: string;
  voiceURL?: string;
  language: string;
  predefined: boolean;
}

export default Recording;
