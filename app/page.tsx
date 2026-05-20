// app/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Star, ChevronRight, User, BookOpen, TrendingUp, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ШАПКА (без изменений) */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                MathMaster
              </div>
              <Badge variant="outline" className="border-green-500 text-green-600">
                Бета
              </Badge>
            </div>

            <nav className="flex gap-6 text-gray-600">
              <a href="#" className="hover:text-green-600 transition font-medium">
                Главная
              </a>
              <a href="#" className="hover:text-green-600 transition">
                Курсы
              </a>
              <a href="#" className="hover:text-green-600 transition">
                Рейтинг
              </a>
              <a href="#" className="hover:text-green-600 transition">
                Профиль
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-orange-600">15</span>
                <span className="text-xs text-gray-500">дней</span>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-yellow-600">1,240</span>
                <span className="text-xs text-gray-500">XP</span>
              </div>
              <Button variant="outline" size="sm" className="border-gray-300">
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* БАННЕР — акцент на математику */}
      <section className="py-20 text-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 mb-4 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Курс: Квадратные уравнения</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Математика, которая <br /> становится понятной
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            От линейных уравнений до квадратных. Пошаговые уроки, интерактивные задания и
            геймификация как в Duolingo.
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg">
            Начать обучение бесплатно
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* СЕТКА КУРСОВ — только математика */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Математические курсы</h2>
            <Button variant="link" className="text-indigo-600 gap-1">
              Все курсы <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Квадратные уравнения — основной курс */}
            <Card className="bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-indigo-100 text-indigo-700 border-0">⭐ Популярный</Badge>
                  <Badge
                    variant="outline"
                    className="border-yellow-300 text-yellow-600 bg-yellow-50">
                    <Star className="w-3 h-3 inline mr-1 fill-yellow-500" /> 0/24
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-3 text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  Квадратные уравнения
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 leading-relaxed">
                  От дискриминанта до теоремы Виета. 24 урока с практикой. Научитесь решать любые
                  квадратные уравнения.
                </p>
                <div className="flex gap-3 mt-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    24 урока
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    🎯 Уровень 1→5
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                  Начать курс <ChevronRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* 2. Линейные уравнения — вводный курс */}
            <Card className="bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-green-100 text-green-700 border-0">🌱 Начальный</Badge>
                  <Badge
                    variant="outline"
                    className="border-yellow-300 text-yellow-600 bg-yellow-50">
                    <Award className="w-3 h-3 inline mr-1" /> 0/12
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-3 text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Линейные уравнения
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 leading-relaxed">
                  С нуля до уверенного решения. Подготовка к квадратным уравнениям и системам.
                </p>
                <div className="flex gap-3 mt-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    12 уроков
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    🎓 С нуля
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                  Начать курс <ChevronRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* 3. Системы уравнений — продвинутый курс (заглушка) */}
            <Card className="bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 opacity-80">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-purple-100 text-purple-700 border-0">🚀 Скоро</Badge>
                  <Badge variant="outline" className="border-gray-300 text-gray-500">
                    В разработке
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-3 text-gray-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Системы уравнений
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 leading-relaxed">
                  Методы подстановки и сложения. Решение систем 2×2 и 3×3.
                </p>
                <div className="flex gap-3 mt-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    ~16 уроков
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    🔥 Продвинутый
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed">
                  Скоро
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* БЛОК ПЛАНОВ — чтобы люди подписались */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">В планах</h2>
          <p className="text-gray-600 mb-6">
            Неравенства, функции, производные, тригонометрия — всё впереди
          </p>
          <Button variant="outline" className="border-indigo-300 text-indigo-600">
            Подписаться на новости
          </Button>
        </div>
      </section>

      <footer className="bg-gray-100 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 MathMaster. Курс по квадратным уравнениям — первый шаг к пониманию математики.
        </div>
      </footer>
    </div>
  );
}
