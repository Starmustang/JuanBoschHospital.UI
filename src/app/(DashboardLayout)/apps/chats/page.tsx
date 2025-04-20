"use client"

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import PageContainer from '@/app/components/container/PageContainer';
import ChatSidebar from '@/app/components/apps/chats/ChatSidebar';
import ChatContent from '@/app/components/apps/chats/ChatContent';
import ChatMsgSent from '@/app/components/apps/chats/ChatMsgSent';
import AppCard from '@/app/components/shared/AppCard';
import { ChatProvider } from '@/app/context/ChatContext/index'

const Chats = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <ChatProvider>
      <PageContainer title="Chat" description="this is Chat">
        <AppCard>
          {/* ------------------------------------------- */}
          {/* Left part */}
          {/* ------------------------------------------- */}

          <ChatSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          {/* ------------------------------------------- */}
          {/* Right part */}
          {/* ------------------------------------------- */}

          <Box flexGrow={1}>
            <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
            <Divider />
            <ChatMsgSent />
          </Box>
        </AppCard>
      </PageContainer>
    </ChatProvider>
  );
};

export default Chats;
