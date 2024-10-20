$(document).ready(function () {
  const chatbot = $("#custom-chatbot");
  const chatMessages = $("#chat-messages");
  const chatOptions = $("#chat-options");
  const optionYes = $("#option-yes");
  const optionNo = $("#option-no");
  const chatToggle = $("#chat-toggle");
  const chatClose = $("#chat-close");

  // Conversation flow
  const conversationFlow = [
    {
      question: "商品について知りたいですか？",
      yes: "どの商品についてお知りになりたいですか？具体的な商品名をお教えください。",
      no: "わかりました。他に何かお手伝いできることはありますか？",
    },
    {
      question: "配送について知りたいですか？",
      yes: "はい、配送については通常3〜5営業日かかります。急ぎの場合は、お急ぎ便もご利用いただけます。",
      no: "了解しました。他に何か質問はありますか？",
    },
    {
      question: "返品ポリシーについて知りたいですか？",
      yes: "返品は商品到着後30日以内であれば可能ですただし、未使用・未開封の状態に限ります。",
      no: "わかりました。他に何かお聞きしたいことはありますか？",
    },
    {
      question: "他に質問はありますか？",
      yes: "どのようなことについて知りたいですか？具体的にお聞かせください。",
      no: "ありがとうございました。何か他に必要なことがあればいつでもお問い合わせください。",
    },
  ];

  let currentQuestionIndex = 0;
  let isWaitingForResponse = false;

  function createTypingIndicator() {
    return $('<div id="typing-indicator" class="message bot-message"><span></span><span></span><span></span></div>');
  }

  function showTypingIndicator() {
    if (!chatMessages.find('.typing-indicator').length) {
      const typingIndicator = $('<div class="typing-indicator message bot-message"><span></span><span></span><span></span></div>');
      chatMessages.append(typingIndicator);
      scrollToBottom();
    }
  }

  function hideTypingIndicator() {
    chatMessages.find('.typing-indicator').remove();
  }

  function addMessageWithTypingEffect(message) {
    if (isWaitingForResponse) return;
    
    hideOptions();
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      addMessage("Bot", message);
      showOptions();
      isWaitingForResponse = true;
    }, 1500);
  }

  function addMessage(sender, message) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageClass = sender === 'Bot' ? 'bot-message' : 'user-message';
    chatMessages.append(`
      <div class="message ${messageClass}">${message}</div>
      <div class="timestamp">${timestamp}</div>
    `);
    scrollToBottom();
  }

  function scrollToBottom() {
    chatMessages.scrollTop(chatMessages[0].scrollHeight);
  }

  function startConversation() {
    chatMessages.empty();
    hideOptions();
    currentQuestionIndex = 0;
    isWaitingForResponse = false;
    addMessage("Bot", "商品について");
    addMessageWithTypingEffect(conversationFlow[currentQuestionIndex].question);
  }

  function resetConversation() {
    currentQuestionIndex = 0;
    isWaitingForResponse = false;
    chatMessages.empty();
    hideOptions();
  }

  function handleUserResponse(isYes) {
    if (!isWaitingForResponse) return;
    
    isWaitingForResponse = false;
    hideOptions();
    addMessage("You", isYes ? "はい" : "いいえ");
    
    const response = isYes
      ? conversationFlow[currentQuestionIndex].yes
      : conversationFlow[currentQuestionIndex].no;
    addMessageWithTypingEffect(response);

    currentQuestionIndex++;

    if (currentQuestionIndex < conversationFlow.length) {
      setTimeout(() => {
        addMessageWithTypingEffect(conversationFlow[currentQuestionIndex].question);
      }, 2000);
    } else {
      setTimeout(() => {
        addMessageWithTypingEffect(
          "ご質問ありがとうございました。他に何かありましたら、またお問い合わせください。"
        );
      }, 2000);
    }
  }

  optionYes.click(function () {
    handleUserResponse(true);
  });

  optionNo.click(function () {
    handleUserResponse(false);
  });

  chatToggle.click(function () {
    chatbot.show();
    chatToggle.hide();
    startConversation();
  });

  chatClose.click(function () {
    chatbot.hide();
    chatToggle.show();
    resetConversation();
  });

  function closeChatbot() {
    chatbot.hide();
    chatToggle.show();
    resetConversation();
  }

  $("#chat-header").click(function () {
    chatbot.hide();
    chatToggle.show();
    resetConversation();
  });

  function showOptions() {
    chatOptions.show();
    scrollToBottom();
  }

  function hideOptions() {
    chatOptions.hide();
  }
});
