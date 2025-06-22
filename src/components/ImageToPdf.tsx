import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import jsPDF from 'jspdf'

interface ImageFile {
  file: File
  url: string
  id: string
}

interface FormData {
  images: FileList
}

const ImageToPdf: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  
  const { register, handleSubmit, watch, reset } = useForm<FormData>()
  
  const watchedImages = watch('images')

  const handleImageUpload = useCallback((files: FileList | null) => {
    if (!files) return

    const newImages: ImageFile[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        newImages.push({
          file,
          url,
          id: `${Date.now()}-${i}`
        })
      }
    }
    
    setImages(prev => [...prev, ...newImages])
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id)
      // 释放URL对象
      const removed = prev.find(img => img.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.url)
      }
      return updated
    })
  }, [])

  const clearAllImages = useCallback(() => {
    images.forEach(img => URL.revokeObjectURL(img.url))
    setImages([])
    reset()
  }, [images, reset])

    const generatePDF = useCallback(async () => {
    if (images.length === 0) {
      alert('请先选择图片')
      return
    }

    setIsGenerating(true)
    
    try {
      // 处理第一张图片来创建PDF
      const firstImage = images[0]
      const firstImg = new Image()
      
      const pdf = await new Promise<jsPDF>((resolve, reject) => {
        firstImg.onload = () => {
          try {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            
            if (!ctx) {
              reject(new Error('无法创建画布上下文'))
              return
            }

            canvas.width = firstImg.naturalWidth
            canvas.height = firstImg.naturalHeight
            ctx.drawImage(firstImg, 0, 0)
            
            const imgData = canvas.toDataURL('image/jpeg', 0.95)
            
            // 先创建默认PDF，然后手动设置页面尺寸
            const newPdf = new jsPDF({
              orientation: 'portrait',
              unit: 'px',
              format: 'a4'
            })
            
            // 手动设置页面尺寸为图片尺寸
            newPdf.internal.pageSize.width = firstImg.naturalWidth
            newPdf.internal.pageSize.height = firstImg.naturalHeight
            
            // 图片占满整个页面
            newPdf.addImage(imgData, 'JPEG', 0, 0, firstImg.naturalWidth, firstImg.naturalHeight)
            resolve(newPdf)
          } catch (error) {
            reject(error)
          }
        }
        
        firstImg.onerror = () => reject(new Error('图片加载失败'))
        firstImg.src = firstImage.url
      })

      // 处理剩余图片
      for (let i = 1; i < images.length; i++) {
        const imageFile = images[i]
        const img = new Image()
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              
              if (!ctx) {
                reject(new Error('无法创建画布上下文'))
                return
              }

              canvas.width = img.naturalWidth
              canvas.height = img.naturalHeight
              ctx.drawImage(img, 0, 0)
              
              const imgData = canvas.toDataURL('image/jpeg', 0.95)
              
              // 添加新页面并设置尺寸
              pdf.addPage()
              pdf.internal.pageSize.width = img.naturalWidth
              pdf.internal.pageSize.height = img.naturalHeight
              
              pdf.addImage(imgData, 'JPEG', 0, 0, img.naturalWidth, img.naturalHeight)
              
              resolve()
            } catch (error) {
              reject(error)
            }
          }
          
          img.onerror = () => reject(new Error('图片加载失败'))
          img.src = imageFile.url
        })
      }
      
      // 下载PDF
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
      pdf.save(`照片图册_${timestamp}.pdf`)
      
    } catch (error) {
      console.error('生成PDF失败:', error)
      alert('生成PDF时出现错误，请重试')
    } finally {
      setIsGenerating(false)
    }
  }, [images])

  React.useEffect(() => {
    if (watchedImages && watchedImages.length > 0) {
      handleImageUpload(watchedImages)
    }
  }, [watchedImages, handleImageUpload])

  // 清理URL对象
  React.useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.url))
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <form onSubmit={handleSubmit(() => {})}>
          <div className="mb-4">
            <label 
              htmlFor="images" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              选择图片文件
            </label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              {...register('images')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">
              支持 JPG、PNG、GIF 等常见图片格式，可多选
            </p>
          </div>
        </form>
      </div>

      {images.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              已选择 {images.length} 张图片
            </h3>
            <button
              onClick={clearAllImages}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              清空所有
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {images.map((imageFile) => (
              <div key={imageFile.id} className="relative group">
                <img
                  src={imageFile.url}
                  alt="预览"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removeImage(imageFile.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <p className="mt-1 text-xs text-gray-500 truncate">
                  {imageFile.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={generatePDF}
          disabled={images.length === 0 || isGenerating}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? '正在生成PDF...' : '生成PDF图册'}
        </button>
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>请选择图片文件开始制作PDF图册</p>
        </div>
      )}
    </div>
  )
}

export default ImageToPdf 