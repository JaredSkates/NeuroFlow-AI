"use client";
import CreateNoteDialog from '@/components/CreateNoteDialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserButton } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <>
        <div className='bg-gradient-to-br min-h-screen from-blue-50 to-gray-300'>
            <h1 className='sm:hidden md:inline absolute top-5 left-10 text-2xl font-bold text-black'>NeuroFlow AI</h1>
            <div className='max-w-7xl mx-auto p-10'>
                <div className="h-14"></div>
                {/* Flex:Row on Screens larger than 768px and Columns on smaller devices */}
                <div className='flex justify-center items-center md:flex-row flex-col'>
                    <div className='flex items-center gap-[16px] mr-5'>
                        <Link href='/'>
                            <Button className='cursor-pointer' size='sm'>
                                <ArrowLeft className='strokeWidth={3} w-4 h-4'></ArrowLeft>
                                Back
                            </Button>
                        </Link>
                        <h1 className='text-3xl font-bold text-gray-800'>My Notes</h1>
                        <UserButton/>
                    </div>
                </div>

                <div className="h-8"></div>

                <Separator className='bg-black'/>

                <div className="h-8"></div>

                {/* Lists All The Notes Here + Conditionally Render */} 
                <div className='text-center'>
                    <h2 className='font-semibold'>No Existing Notes.</h2>
                    <div className="h-4"></div>
                </div>

                {/* Display all notes */}
                <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                    <CreateNoteDialog/>
                </div>

            </div>
        </div>
    </>
  )
}

export default DashboardPage;