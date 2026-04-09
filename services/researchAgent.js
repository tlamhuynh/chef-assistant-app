import { mockNotebookLLMFilterAndRefine } from './llmService';

export class ResearchAgent {
  constructor(topic, onProgress, onComplete) {
    this.id = Date.now();
    this.topic = topic;
    this.status = 'Initializing...';
    this.onProgress = onProgress;
    this.onComplete = onComplete;
  }

  async start() {
    this.status = 'Scraping & Gathering Data...';
    this._notifyProgress();

    await new Promise(res => setTimeout(res, 2000));

    this.status = 'Notebook LLM Filtering & Refining...';
    this._notifyProgress();

    try {
        const refinedData = await mockNotebookLLMFilterAndRefine(this.topic);
        
        this.status = 'Completed';
        this._notifyProgress();
        
        if(this.onComplete) {
            this.onComplete(refinedData);
        }
    } catch (error) {
        this.status = 'Failed';
        this._notifyProgress();
    }
  }

  _notifyProgress() {
    if (this.onProgress) {
      this.onProgress({
        id: this.id,
        name: `Nghiên cứu: ${this.topic}`,
        status: this.status,
        description: `Agent đang xử lý thông tin về "${this.topic}"...`
      });
    }
  }
}
