import { Component } from '@angular/core';
import { getChatResponse } from '../../service/chat_service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

   messages: string[] = [];

   async sendMessage(message: string) {
    const chatContainer = document.getElementById('chat-container') as HTMLElement;

    if (!chatContainer) return;

    // Append user message to chat container
    chatContainer.innerHTML += `
      <div class="flex justify-end items-start gap-1 sm:gap-2 md:gap-4 relative">
        <div class="max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-md bg-slate-800 p-2 sm:p-3 md:p-4 border-b-2 border-slate-700 text-slate-300 relative">
          <p class="text-[10px] sm:text-xs md:text-sm lg:text-base font-mono">&gt; ${message}</p>
          <div class="absolute -top-1 sm:-top-2 right-0 w-2 sm:w-3 md:w-4 h-1 sm:h-2 bg-slate-700"></div>
          <span class="text-[8px] sm:text-[10px] md:text-xs text-slate-500 font-mono mt-1 block text-right">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="w-6 sm:w-8 md:w-12 lg:w-14 h-1 sm:h-2 bg-slate-700 mt-2 sm:mt-3 md:mt-4"></div>
      </div>
    `;

    // Wait for the response before appending it to the chat
    const response = await getChatResponse(message);
    
    // Append the response message to chat container
    chatContainer.innerHTML += `
      <div class="flex items-start gap-1 sm:gap-2 md:gap-4 relative">
        <div class="w-6 sm:w-8 md:w-12 lg:w-14 h-1 sm:h-2 bg-slate-700 mt-2 sm:mt-3 md:mt-4"></div>
        <div class="max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-md bg-slate-800 p-2 sm:p-3 md:p-4 border-t-2 border-slate-700 text-slate-300 relative">
          <p class="text-[10px] sm:text-xs md:text-sm lg:text-base font-mono">&gt; ${response}</p>
          <div class="absolute -bottom-1 sm:-bottom-2 left-0 w-2 sm:w-3 md:w-4 h-1 sm:h-2 bg-slate-700"></div>
          <span class="text-[8px] sm:text-[10px] md:text-xs text-slate-500 font-mono mt-1 block">${new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    `;

    // Auto scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

}
