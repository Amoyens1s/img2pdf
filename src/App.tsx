import React from 'react'
import ImageToPdf from './components/ImageToPdf'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            图片转PDF工具
          </h1>
          <p className="text-sm text-blue-600">
            🌐 在线版本：<a href="https://amoyens1s.github.io/img2pdf" className="underline hover:text-blue-800">amoyens1s.github.io/img2pdf</a>
          </p>
        </div>
        <ImageToPdf />
      </div>
    </div>
  )
}

export default App 