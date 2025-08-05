'use client';


import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { ThemeToggle } from '~/components/themeToggle';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动状态
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ease-out ${isScrolled ? 'liquid-glass-header-scrolled' : 'liquid-glass-header'} `}>
        {/* 动态彩虹光线 */}
        <div className="through-purple-500/60 absolute top-0 right-0 left-0 h-px animate-pulse bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        {/* 液态玻璃容器 */}
        <div className="liquid-glass-container">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo区域 - 增强发光效果 */}
              <div className="flex items-center space-x-4">
                <Link href="/" className="group flex items-center space-x-2">
                  <div className="relative">
                    <div className="liquid-glow flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-500 group-hover:shadow-blue-500/40">
                      <FileText className="h-5 w-5 text-white drop-shadow-sm" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-40" />
                  </div>
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                    简历编辑器
                  </span>
                </Link>
              </div>

              {/* 应用标题 */}
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  简历编辑器
                </h1>
              </div>

              {/* 右侧操作区 - 增强玻璃按钮 */}
              <div className="flex items-center space-x-2">




                {/* 主题切换 */}
                <div className="liquid-glass-container-small">
                  <ThemeToggle />
                </div>




              </div>
            </div>
          </nav>
        </div>

        {/* 底部彩虹光线 */}
        <div className="through-pink-500/50 absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </header>


    </>
  );
}
