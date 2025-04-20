'use client';
import React from 'react';

import ParentCard from '@/app/components/shared/ParentCard';

import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('./TiptapEditor'), {
  ssr: false,
});


const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Tiptap Editor',
    },
];

const Editor = () => {

    return (

        <ParentCard title="Tiptap Editor">
            <TiptapEditor />
        </ParentCard>

    );
};

export default Editor;
