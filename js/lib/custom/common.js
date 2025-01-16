const handleRefresh = (delay) => {
    let timoutId = setTimeout(() => {
      location.reload();
      clearTimeout(timoutId);
    }, delay);
  };
  
  export { handleRefresh };
  