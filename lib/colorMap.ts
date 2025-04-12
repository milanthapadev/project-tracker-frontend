export const ALPHABET_COLORS: Record<string, string> = {
    A: 'bg-red-100 text-red-800',
    B: 'bg-blue-100 text-blue-800',
    C: 'bg-green-100 text-green-800',
    D: 'bg-yellow-100 text-yellow-800',
    E: 'bg-purple-100 text-purple-800',
    F: 'bg-pink-100 text-pink-800',
    G: 'bg-indigo-100 text-indigo-800',
    H: 'bg-orange-100 text-orange-800',
    I: 'bg-teal-100 text-teal-800',
    J: 'bg-cyan-100 text-cyan-800',
    K: 'bg-amber-100 text-amber-800',
    L: 'bg-lime-100 text-lime-800',
    M: 'bg-emerald-100 text-emerald-800',
    N: 'bg-violet-100 text-violet-800',
    O: 'bg-fuchsia-100 text-fuchsia-800',
    P: 'bg-rose-100 text-rose-800',
    Q: 'bg-sky-100 text-sky-800',
    R: 'bg-stone-100 text-stone-800',
    S: 'bg-zinc-100 text-zinc-800',
    T: 'bg-gray-100 text-gray-800',
    U: 'bg-slate-100 text-slate-800',
    V: 'bg-neutral-100 text-neutral-800',
    W: 'bg-stone-100 text-stone-800',
    X: 'bg-red-200 text-red-900',
    Y: 'bg-blue-200 text-blue-900',
    Z: 'bg-green-200 text-green-900',
  };
  
  export const getColorByLetter = (letter: string): string => {
    const upperLetter = letter.toUpperCase();
    return ALPHABET_COLORS[upperLetter] || 'bg-gray-100 text-gray-800';
  };