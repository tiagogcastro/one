import React, { createContext, useCallback, useContext, useState } from 'react';

interface ITranslateContextData {
  translation: string;
  // eslint-disable-next-line no-unused-vars
  changeTranslation(value: string): void;
}

const TranslateContext = createContext<ITranslateContextData>(
  {} as ITranslateContextData,
);

const TranslateProvider: React.FC = (props: any) => {
  const [translation, setTranslation] = useState<string>(() => {
    const userTranslate = localStorage.getItem('@nou-one:translation');

    if (userTranslate) return userTranslate;

    return 'pt-br';
  });

  const changeTranslation = useCallback((value: string) => {
    if (value === 'en-us') {
      localStorage.setItem('@nou-one:translation', 'en-us');
      setTranslation('en-us');
    } else {
      localStorage.setItem('@nou-one:translation', 'pt-br');
      setTranslation('pt-br');
    }
  }, []);

  return (
    <TranslateContext.Provider value={{ translation, changeTranslation }}>
      {props.children}
    </TranslateContext.Provider>
  );
};

function useTranslation(): ITranslateContextData {
  const context = useContext(TranslateContext);

  return context;
}

export { TranslateProvider, useTranslation };
