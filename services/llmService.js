export const mockNotebookLLMAnalyze = async (userInput) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      let intent = 'general_chat';
      let extractedData = null;

      if (lowerInput.includes('nghiên cứu') || lowerInput.includes('tìm hiểu')) {
        intent = 'start_research';
        extractedData = { topic: userInput.replace(/nghiên cứu|tìm hiểu/gi, '').trim() };
      } else if (lowerInput.includes('lưu') || lowerInput.includes('ghi nhớ')) {
        intent = 'save_knowledge';
        extractedData = { content: userInput };
      } else if (lowerInput.includes('theo dõi') || lowerInput.includes('nhắc')) {
        intent = 'create_monitor_agent';
        extractedData = { task: userInput };
      } else if (lowerInput.includes('chức năng') || lowerInput.includes('tính năng')) {
        intent = 'generate_plugin';
        extractedData = { featureName: 'Tính năng phân tích độ ẩm thực phẩm' };
      }

      let responseText = "Vâng thưa Chef, hệ thống Notebook LLM đã tiếp nhận.";
      switch (intent) {
        case 'start_research':
          responseText = `Tôi đã tạo một Agent tự động để bắt đầu nghiên cứu sâu về: "${extractedData.topic}". Tôi sẽ sàng lọc thông tin và cập nhật vào Kho kiến thức sớm nhất.`;
          break;
        case 'save_knowledge':
          responseText = "Đã trích xuất và đồng bộ thông tin này vào cơ sở dữ liệu Notebook LLM.";
          break;
        case 'create_monitor_agent':
          responseText = "Đã khởi tạo Agent ngầm định kỳ theo dõi tác vụ này.";
          break;
        case 'generate_plugin':
          responseText = `Dựa trên ngữ cảnh, Notebook LLM đề xuất và đã khởi tạo plugin: "${extractedData.featureName}".`;
          break;
        default:
          responseText = "Dựa trên kho dữ liệu Notebook, tôi có thể tư vấn thêm các công thức lên men nếu Chef cần.";
      }

      resolve({ intent, extractedData, responseText });
    }, 1500); 
  });
};

export const mockNotebookLLMFilterAndRefine = async (topic) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const refinedKnowledge = {
                title: `Kết quả nghiên cứu: ${topic}`,
                content: `(Đã sàng lọc bởi LLM) ${topic} có nguồn gốc từ vùng Địa Trung Hải, lý tưởng nhất là kết hợp với dầu olive Extra Virgin, độ chua < 0.8%.`
            };
            resolve(refinedKnowledge);
        }, 3000);
    });
};
