import { useState } from 'react';

// ----------------------------------------------------------------------

export default function useTabs(defaultValues) {
  const [currentTab, setCurrentTab] = useState(defaultValues || '');

  console.log(defaultValues)
  return {
    currentTab,
    onChangeTab: (event, newValue) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
