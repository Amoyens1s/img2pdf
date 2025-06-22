import React from 'react'
import ImageToPdf from './components/ImageToPdf'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          图片转PDF工具
        </h1>
        <ImageToPdf />
      </div>
    </div>
  )
}

export default App 