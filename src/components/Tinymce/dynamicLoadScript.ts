let callbacks: any[] = [];

function loadedTinymce() {
  return (window as any).tinymce;
}

const dynamicLoadScript = (src: string, callback: any) => {
  const existingScript = document.getElementById(src);

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = src;
    script.id = src;
    document.body.appendChild(script);
    callbacks.push(callback);
    const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd;
    onEnd(script);
  }

  if (existingScript && callback) {
    if (loadedTinymce()) {
      callback(null, existingScript);
    } else {
      callbacks.push(callback);
    }
  }

  function stdOnEnd(script: any) {
    script.onload = function() {
      this.onerror = this.onload = null;
      for (const cb in callbacks) {
        if (callbacks.hasOwnProperty(cb)) {
          const element = callbacks[cb];
          callback = element;
          callback(null, script);
        }
      }
      callbacks = [];
    };
    script.onerror = function() {
      this.onerror = this.onload = null;
      callback(new Error('Failed to load ' + src), script);
    };
  }

  function ieOnEnd(script: any) {
    script.onreadystatechange = function() {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') {
        return;
      }
      this.onreadystatechange = null;
      for (const cb in callbacks) {
        if (callbacks.hasOwnProperty(cb)) {
          const element = callbacks[cb];
          callback = element;
          callback(null, script);
        }
      }
      callbacks = [];
    };
  }
};

export default dynamicLoadScript;
