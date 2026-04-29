const key = "AIzaSyBZ1hbUOA-lHkS_j1_0-HpLwj0WrHMfkgc";
fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
  .then(r => r.json())
  .then(data => {
    const names = data.models.map(m => m.name);
    console.log("Flash models:", names.filter(n => n.includes('flash')));
    console.log("Pro models:", names.filter(n => n.includes('pro')));
    console.log("Gemini models:", names.filter(n => n.includes('gemini')));
  });
