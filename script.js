
    let autoRun = true;
    let debounceTimer;
    let isFullscreen = false;

  
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.editor-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const editor = tab.dataset.editor;

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        document.querySelector(`[data-panel="${editor}"]`).classList.add('active');
      });
    });

    
    const autoRunToggle = document.getElementById('autoRunToggle');
    autoRunToggle.addEventListener('click', () => {
      autoRun = !autoRun;
      autoRunToggle.classList.toggle('active');
    });

   
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.addEventListener('input', () => {
        if (autoRun) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            runCode();
          }, 800);
        }
      });

     
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }
      });
    });

  
    function runCode() {
      const html = document.getElementById('htmlCode').value;
      const css = `<style>${document.getElementById('cssCode').value}</style>`;
      const js = `<script>${document.getElementById('jsCode').value}<\/script>`;

      const finalCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${css}
</head>
<body>
  ${html}
  ${js}
</body>
</html>`;

      const iframe = document.getElementById('output');
      iframe.srcdoc = finalCode;
    }

  
    function clearAll() {
      if (confirm('⚠️ Are you sure you want to clear all code? This action cannot be undone.')) {
        document.getElementById('htmlCode').value = '';
        document.getElementById('cssCode').value = '';
        document.getElementById('jsCode').value = '';
        runCode();
      }
    }

   
    function downloadCode() {
      const html = document.getElementById('htmlCode').value;
      const css = document.getElementById('cssCode').value;
      const js = document.getElementById('jsCode').value;

      const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code With Muaaz Project</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  <\/script>
</body>
</html>`;

      const blob = new Blob([fullCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'codewithmuaaz-project.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

   
    function refreshOutput() {
      runCode();
    }

    
    function toggleFullscreen() {
      const outputSection = document.getElementById('outputSection');
      const fullscreenBtn = event.currentTarget.querySelector('i');
      
      outputSection.classList.toggle('fullscreen');
      isFullscreen = !isFullscreen;
      
      if (isFullscreen) {
        fullscreenBtn.classList.remove('fa-expand');
        fullscreenBtn.classList.add('fa-compress');
      } else {
        fullscreenBtn.classList.remove('fa-compress');
        fullscreenBtn.classList.add('fa-expand');
      }
    }

   
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    });

    
    window.addEventListener('load', () => {
      document.getElementById('htmlCode').value = `<div class="hero">
  <div class="content">
    <h1>Welcome to Code With Muaaz! 🚀</h1>
    <p>Your ultimate online code compiler</p>
    <button class="btn" onclick="changeTheme()">
      <i class="fas fa-palette"></i> Change Theme
    </button>
  </div>
</div>`;

      document.getElementById('cssCode').value = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', Arial, sans-serif;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: background 0.5s ease;
}

.content {
  text-align: center;
  color: white;
  animation: fadeIn 1s ease;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 700;
}

p {
  font-size: 24px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.btn {
  padding: 15px 40px;
  font-size: 18px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

      document.getElementById('jsCode').value = `console.log('🎉 Welcome to Code With Muaaz Compiler!');

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
];

let currentIndex = 0;

function changeTheme() {
  currentIndex = (currentIndex + 1) % gradients.length;
  document.querySelector('.hero').style.background = gradients[currentIndex];
  console.log('Theme changed! 🎨');
}

// Welcome message
setTimeout(() => {
  console.log('Start coding and see your changes live! ⚡');
}, 1000);`;

      runCode();
    });

   
    function saveCode() {
      localStorage.setItem('cwm_html', document.getElementById('htmlCode').value);
      localStorage.setItem('cwm_css', document.getElementById('cssCode').value);
      localStorage.setItem('cwm_js', document.getElementById('jsCode').value);
    }

 
    setInterval(saveCode, 3000);

   
    window.addEventListener('DOMContentLoaded', () => {
      const savedHtml = localStorage.getItem('cwm_html');
      const savedCss = localStorage.getItem('cwm_css');
      const savedJs = localStorage.getItem('cwm_js');

      if (savedHtml || savedCss || savedJs) {
        if (confirm('Found previously saved code. Would you like to restore it?')) {
          if (savedHtml) document.getElementById('htmlCode').value = savedHtml;
          if (savedCss) document.getElementById('cssCode').value = savedCss;
          if (savedJs) document.getElementById('jsCode').value = savedJs;
          runCode();
        }
      }
    });
 