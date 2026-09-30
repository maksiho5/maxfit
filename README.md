# MaxFit

Трекер тренировок на неделю: зал и бассейн по дням, упражнения для осанки каждый день, отметки о выполнении и прогресс дня. Прогресс сохраняется в браузере.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## Программа

| День | Тренировка |
|---|---|
| ПН | Зал A |
| ВТ | Бассейн |
| СР | Зал B |
| ЧТ | Бассейн |
| ПТ | Зал A |
| СБ | Бассейн |
| ВС | Восстановление |

Плюс два упражнения для осанки каждый день.

## Возможности

- Выбор дня недели, список упражнений с подходами, отдыхом и заметками
- Ссылки на видео с техникой выполнения
- Отметка «выполнено» и прогресс-бар дня
- Сохранение в `localStorage`, сброс дня одной кнопкой
- Адаптивная вёрстка и базовая доступность (ARIA)

## Карта проекта

```
maxfit/
└── src/
    ├── App.tsx      # Интерфейс: выбор дня, карточки, прогресс
    ├── data.ts      # Программа тренировок на неделю
    ├── types.ts     # Типы: Exercise, PoolExercise, PostureExercise, DayPlan
    └── index.css    # Tailwind и базовые стили
```

```mermaid
flowchart LR
    data.ts --> App.tsx
    App.tsx <--> LS[(localStorage)]
```

## Запуск

```bash
npm install
npm run dev
```

Упражнения собраны по мотивам [exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset).
