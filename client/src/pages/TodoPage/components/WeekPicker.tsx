import { useState, useMemo } from 'react';
import { cn } from '../../../lib/utils';

interface WeekPickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

// 주 시작일(월요일) 구하기
function getStartOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export function WeekPicker({ selectedDate, onSelectDate }: WeekPickerProps) {
  const [weekStart, setWeekStart] = useState(() => getStartOfWeek(new Date()));

  // 현재 보여줄 주(Week)의 날짜들 계산
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const handlePrevWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() - 7);
    setWeekStart(newStart);
  };

  const handleNextWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + 7);
    setWeekStart(newStart);
  };

  return (
    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-sdi-gray-border shadow-sm">
      <button
        onClick={handlePrevWeek}
        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
      >
        &lt;
      </button>
      <div className="flex flex-1 justify-around">
        {weekDays.map((date) => {
          const isSelected =
            date.getFullYear() === selectedDate.getFullYear() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getDate() === selectedDate.getDate();
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={cn(
                'flex flex-col items-center justify-center w-10 h-auto py-2 rounded-lg transition-all text-sm',
                isSelected
                  ? 'bg-sdi-black text-white shadow-md scale-105'
                  : 'hover:bg-gray-50 text-gray-500',
                isToday && !isSelected && 'text-blue-600 font-bold'
              )}
            >
              <span className="text-[10px] opacity-70 leading-none mb-2">
                {date.getMonth() + 1}월
              </span>
              <span className="font-bold text-xl leading-none">
                {date.getDate()}
              </span>
              <span className="text-sm font-medium mb-0.5">
                {new Intl.DateTimeFormat('ko-KR', {
                  weekday: 'short',
                }).format(date)}
              </span>
            </button>
          );
        })}
      </div>
      <button
        onClick={handleNextWeek}
        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
      >
        &gt;
      </button>
    </div>
  );
}
