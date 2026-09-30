import { useMemo, useState } from 'react';
import { Check, Dumbbell, ExternalLink, Flame, RotateCcw, Waves } from 'lucide-react';
import { week } from './data';
import type { Exercise, PoolExercise, PostureExercise } from './types';

const STORAGE_KEY = 'maxfit-completed-v1';

export default function App() {
  const [selected, setSelected] = useState('mon');
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    } catch {
      return {};
    }
  });
  const day = useMemo(() => week.find((x) => x.key === selected) ?? week[0], [selected]);
  const allItems = [...day.exercises, ...day.posture],
    done = allItems.filter((x) => completed[x.id]).length,
    progress = allItems.length ? Math.round((done / allItems.length) * 100) : 0;
  const toggle = (id: string) =>
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  const resetDay = () =>
    setCompleted((prev) => {
      const next = { ...prev };
      allItems.forEach((x) => delete next[x.id]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#071426]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-sky-400">MAXFIT</p>
            <h1 className="text-xl font-bold sm:text-2xl">Зал + бассейн</h1>
          </div>
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 sm:flex">
            <Flame size={16} className="text-orange-400" />
            Тренируйся стабильно
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <section className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="muted mb-2 text-sm">Тренировочная неделя</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{day.title}</h2>
            <p className="muted mt-2">{day.subtitle}</p>
          </div>
          <div className="card min-w-[220px] rounded-2xl p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Выполнено</span>
              <b>
                {done}/{allItems.length}
              </b>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-sky-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="muted mt-2 text-xs">{progress}% отмечено</p>
          </div>
        </section>
        <nav aria-label="Дни недели" className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {week.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelected(item.key)}
              aria-current={selected === item.key ? 'page' : undefined}
              className={`rounded-xl border px-2 py-3 text-left transition ${selected === item.key ? 'border-sky-500/60 bg-sky-500/15' : 'border-white/10 bg-white/[.03] hover:bg-white/[.07]'}`}
            >
              <span className="block text-xs text-slate-400">{item.short}</span>
              <span className="mt-1 block font-semibold">
                {item.code === 'POOL' ? '🏊' : item.code === 'REST' ? '↺' : item.code}
              </span>
            </button>
          ))}
        </nav>
        {day.code === 'REST' ? (
          <section className="card rounded-2xl p-6">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
              <RotateCcw />
            </div>
            <h3 className="text-2xl font-bold">День восстановления</h3>
            <p className="muted mt-2 max-w-2xl">
              Отдых — часть программы. Можно оставить только лёгкую подвижность и обычную активность
              без тяжёлой тренировки.
            </p>
          </section>
        ) : (
          <>
            <section aria-labelledby="workout-title" className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 id="workout-title" className="text-xl font-bold">
                  {day.title}
                </h3>
                <button
                  onClick={resetDay}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <RotateCcw size={14} />
                  Сбросить
                </button>
              </div>
              <div className="grid gap-3">
                {day.exercises.map((e, i) => (
                  <ExerciseCard
                    key={e.id}
                    exercise={e}
                    index={i + 1}
                    checked={!!completed[e.id]}
                    onToggle={toggle}
                  />
                ))}
              </div>
            </section>
            <section aria-labelledby="posture-title">
              <div className="mb-3">
                <h3 id="posture-title" className="text-xl font-bold">
                  Растяжка и осанка
                </h3>
                <p className="muted mt-1 text-sm">2 коротких упражнения каждый день.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {day.posture.map((e, i) => (
                  <PostureCard
                    key={e.id}
                    exercise={e}
                    index={i + 1}
                    checked={!!completed[e.id]}
                    onToggle={toggle}
                  />
                ))}
              </div>
            </section>
          </>
        )}
        <footer className="mt-10 border-t border-white/10 pt-5 text-xs leading-5 text-slate-500">
          <p>
            Личный трекер. Нагрузку выбирай с учётом техники и самочувствия; при боли упражнение
            прекращай и обращайся к тренеру/взрослому специалисту.
          </p>
          <p className="mt-2">
            Каталог: hasaneyldrm/exercises-dataset. Для медиа учитывай условия исходного
            репозитория.
          </p>
        </footer>
      </main>
    </div>
  );
}

function ExerciseCard({
  exercise,
  index,
  checked,
  onToggle,
}: {
  exercise: Exercise | PoolExercise;
  index: number;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  const pool = 'duration' in exercise;
  return (
    <article
      className={`card rounded-2xl p-4 transition ${checked ? 'border-emerald-500/30 bg-emerald-500/[.06]' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(exercise.id)}
          aria-label={`${checked ? 'Снять отметку' : 'Отметить'}: ${exercise.name}`}
          className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border ${checked ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-slate-600 bg-slate-900/50 hover:border-sky-400'}`}
        >
          {checked ? <Check size={18} /> : <span className="text-sm text-slate-500">{index}</span>}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {pool ? (
              <Waves size={16} className="text-cyan-400" />
            ) : (
              <Dumbbell size={16} className="text-sky-400" />
            )}
            <h4 className={`font-semibold ${checked ? 'text-slate-400 line-through' : ''}`}>
              {exercise.name}
            </h4>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-lg bg-white/5 px-2 py-1 text-slate-300">
              {pool ? exercise.duration : exercise.sets}
            </span>
            {!pool && (
              <span className="rounded-lg bg-white/5 px-2 py-1 text-slate-400">
                Отдых {exercise.rest}
              </span>
            )}
          </div>
          <p className="muted mt-2 text-sm">{exercise.note}</p>
        </div>
        {exercise.youtube && (
          <a
            href={exercise.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label={`Видео: ${exercise.name}`}
            className="rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={17} />
          </a>
        )}
      </div>
    </article>
  );
}

function PostureCard({
  exercise,
  index,
  checked,
  onToggle,
}: {
  exercise: PostureExercise;
  index: number;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <article
      className={`card rounded-2xl p-4 ${checked ? 'border-emerald-500/30 bg-emerald-500/[.06]' : ''}`}
    >
      <div className="flex gap-3">
        <button
          onClick={() => onToggle(exercise.id)}
          aria-label={`${checked ? 'Снять отметку' : 'Отметить'}: ${exercise.name}`}
          className={`grid size-9 shrink-0 place-items-center rounded-xl border ${checked ? 'border-emerald-400 bg-emerald-500' : 'border-slate-600'}`}
        >
          {checked ? <Check size={17} /> : index}
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold">{exercise.name}</h4>
            {exercise.youtube && (
              <a
                href={exercise.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="Открыть видео"
                className="text-sky-400"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <p className="mt-1 text-sm text-sky-300">{exercise.duration}</p>
          <p className="muted mt-2 text-sm">{exercise.description}</p>
        </div>
      </div>
    </article>
  );
}
