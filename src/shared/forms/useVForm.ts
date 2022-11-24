import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';


export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const isSavingAndNew = useRef(false);
  const isSavingAndClose = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndClose = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = true;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);

  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);


  return {
    formRef,
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,    
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose,
  };
};