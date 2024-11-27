import React from 'react';

export default function ErrorBox({ err }) {
    return (
        <div className=' font-roboto text-red-600 font-sm mt-5 flex items-center justify-center'>
            {err instanceof Error ? err.message : err}
        </div>
    );
}
