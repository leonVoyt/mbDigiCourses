# 🎓 Courses Learning Platform

Современная платформа для обучения с курсами, построенная на React, TypeScript и Redux Toolkit.

## ✨ Возможности

- **Аутентификация пользователей** - регистрация и вход по email/password
- **Каталог курсов** - просмотр доступных курсов с описанием и ценами
- **Покупка курсов** - система оплаты с обработкой ошибок
- **Видеоплеер** - просмотр видео курсов с сохранением позиции воспроизведения
- **Адаптивный дизайн** - работает на всех устройствах
- **Валидация форм** - проверка ввода с отображением ошибок для каждого поля

## 🚀 Технологии

- **Frontend**: React 19 + TypeScript
- **State Management**: Redux Toolkit
- **Styling**: CSS3 с модульной архитектурой
- **Build Tool**: Vite
- **Validation**: Zod
- **Package Manager**: npm

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
│   ├── AuthForm.tsx    # Форма аутентификации
│   ├── CourseList.tsx  # Список курсов
│   └── VideoPlayer.tsx # Видеоплеер
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   │   ├── authSlice.ts    # Аутентификация
│   │   ├── coursesSlice.ts # Курсы и покупки
│   │   └── videoSlice.ts   # Видеоплеер
│   ├── hooks.ts        # Redux hooks
│   ├── selectors.ts    # Redux selectors
│   └── store.ts        # Store конфигурация
├── App.tsx             # Главный компонент
└── main.tsx            # Точка входа
```

## 🛠️ Установка и запуск

### Предварительные требования

- Node.js 20.19+ или 22.12+
- npm 9+

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: [http://localhost:5173](http://localhost:5173)

### Сборка для продакшена

```bash
npm run build
```

### Предварительный просмотр сборки

```bash
npm run preview
```

### Проверка кода

```bash
npm run lint
```

## 🎯 Основные функции

### Аутентификация

- Валидация email и password в реальном времени
- Отображение ошибок валидации под каждым полем
- Сохранение состояния пользователя в localStorage

### Курсы

- Загрузка списка курсов с мок-данными
- Отображение информации о курсе (название, описание, цена)
- Система покупки с имитацией платежа
- Обработка ошибок оплаты

### Видеоплеер

- Модальное окно для просмотра видео
- Сохранение позиции воспроизведения в localStorage
- Автоматическое восстановление позиции при повторном открытии

## 🔧 Конфигурация

### TypeScript

- Строгая типизация включена
- Конфигурация разделена на `tsconfig.app.json` и `tsconfig.node.json`

### ESLint

- Настроен для React и TypeScript
- Правила для hooks и refresh

### Vite

- Быстрая сборка и HMR
- Оптимизация для продакшена

## 📱 Адаптивность

Приложение адаптировано для различных размеров экранов:

- Desktop (1100px+)
- Tablet (768px - 1099px)
- Mobile (< 768px)

## 🎨 Стилизация

- CSS модули с BEM методологией
- Адаптивная сетка для курсов
- Современный дизайн с hover эффектами
- Цветовая схема Google Material Design

## 🚧 Разработка

### Добавление нового курса

Отредактируйте массив `mockCourses` в `src/store/slices/coursesSlice.ts`:

```typescript
const mockCourses: Course[] = [
  {
    id: "3",
    title: "New Course",
    description: "Course description",
    videoUrl: "https://example.com/video.mp4",
    price: 39.99,
    isPaymentFailed: false,
  },
  // ... существующие курсы
];
```

### Добавление новых полей валидации

Используйте Zod схему в `src/components/AuthForm.tsx`:

```typescript
const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "At least 6 characters"),
  // Добавьте новые поля здесь
});
```

## 📄 Лицензия

Этот проект создан для образовательных целей.

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📞 Поддержка

Если у вас есть вопросы или предложения, создайте issue в репозитории.
