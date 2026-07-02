// Minimal client-side script for the Tutor STUDIO demo
document.addEventListener('DOMContentLoaded', ()=>{
  const recentList = document.getElementById('recent-list');
  // Try loading sample data from localStorage
  const sample = JSON.parse(localStorage.getItem('bbt_recent_lessons')||'[]');
  if(sample.length){
    recentList.innerHTML = '';
    sample.slice(0,10).forEach(l=>{
      const li = document.createElement('li');
      li.textContent = `${l.title} — ${l.grade || 'N/A'} — ${l.subject || 'General'}`;
      recentList.appendChild(li);
    });
  }

  // Auto-save forms (lesson and lesson_plan) if present
  const lessonForm = document.querySelector('#lesson-form');
  if(lessonForm){
    lessonForm.addEventListener('submit', e=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(lessonForm).entries());
      const lessons = JSON.parse(localStorage.getItem('bbt_lessons')||'[]');
      lessons.unshift(data);
      localStorage.setItem('bbt_lessons', JSON.stringify(lessons));
      // also add to recent
      const recent = JSON.parse(localStorage.getItem('bbt_recent_lessons')||'[]');
      recent.unshift({title:data.title,grade:data.grade,subject:data.subject});
      localStorage.setItem('bbt_recent_lessons', JSON.stringify(recent));
      alert('Lesson saved locally (demo).');
      window.location.href = 'index.html';
    });
  }

  const planForm = document.querySelector('#plan-form');
  if(planForm){
    planForm.addEventListener('submit', e=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(planForm).entries());
      const plans = JSON.parse(localStorage.getItem('bbt_plans')||'[]');
      plans.unshift(data);
      localStorage.setItem('bbt_plans', JSON.stringify(plans));
      alert('Lesson plan saved locally (demo).');
      window.location.href = 'index.html';
    });
  }
});
