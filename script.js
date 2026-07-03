// Minimal client-side script for the Tutor STUDIO demo
function formatKeyValue(k,v){
  if(!v) return '<span class="small">—</span>';
  return `<div class="view-row"><dt>${k}</dt><dd>${v}</dd></div>`;
}
function renderLesson(targetEl, lesson){
  if(!lesson){
    targetEl.innerHTML = '<p class="small">No lesson available. Create one first.</p>';
    return;
  }
  const html = [`<h5>${lesson.title || 'Untitled'}</h5>`];
  html.push('<dl>');
  html.push(`<div class="view-row"><dt>Grade:</dt><dd>${lesson.grade || 'N/A'}</dd></div>`);
  html.push(`<div class="view-row"><dt>Subject:</dt><dd>${lesson.subject || 'General'}</dd></div>`);
  if(lesson.duration) html.push(`<div class="view-row"><dt>Duration:</dt><dd>${lesson.duration}</dd></div>`);
  if(lesson.summary) html.push(`<p>${escapeHtml(lesson.summary)}</p>`);
  if(lesson.content) html.push(`<pre style="white-space:pre-wrap;background:#fff;padding:8px;border-radius:6px;border:1px solid #e6eef7">${escapeHtml(lesson.content)}</pre>`);
  html.push('</dl>');
  targetEl.innerHTML = html.join('');
}
function renderPlan(targetEl, plan){
  if(!plan){
    targetEl.innerHTML = '<p class="small">No lesson plan available. Create one first.</p>';
    return;
  }
  const html = [`<h5>${plan.lesson_title || 'Untitled Plan'}</h5>`];
  if(plan.grade) html.push(`<div class="view-row"><dt>Grade:</dt><dd>${plan.grade}</dd></div>`);
  if(plan.objectives) html.push(`<h6>Objectives</h6><p>${escapeHtml(plan.objectives)}</p>`);
  if(plan.materials) html.push(`<h6>Materials</h6><p>${escapeHtml(plan.materials)}</p>`);
  if(plan.activities) html.push(`<h6>Activities</h6><p>${escapeHtml(plan.activities)}</p>`);
  if(plan.assessment) html.push(`<h6>Assessment</h6><p>${escapeHtml(plan.assessment)}</p>`);
  targetEl.innerHTML = html.join('');
}
function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}

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

  // View Window controls
  const viewBtn = document.getElementById('view-window-btn');
  const modal = document.getElementById('view-window');
  const closeBtn = document.getElementById('view-close');
  const backdrop = document.getElementById('modal-backdrop');
  const lessonTarget = document.getElementById('view-lesson-content');
  const planTarget = document.getElementById('view-plan-content');
  const openLessonEditor = document.getElementById('view-open-lesson');
  const openPlanEditor = document.getElementById('view-open-plan');

  function openViewWindow(){
    // load latest lesson and plan
    const lessons = JSON.parse(localStorage.getItem('bbt_lessons')||'[]');
    const plans = JSON.parse(localStorage.getItem('bbt_plans')||'[]');
    const latestLesson = lessons.length ? lessons[0] : null;
    const latestPlan = plans.length ? plans[0] : null;
    renderLesson(lessonTarget, latestLesson);
    renderPlan(planTarget, latestPlan);
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  }
  function closeViewWindow(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }

  if(viewBtn){
    viewBtn.addEventListener('click', openViewWindow);
  }
  if(closeBtn){
    closeBtn.addEventListener('click', closeViewWindow);
  }
  if(backdrop){
    backdrop.addEventListener('click', closeViewWindow);
  }
  if(openLessonEditor){
    openLessonEditor.addEventListener('click', ()=>{ window.location.href='lesson.html'; });
  }
  if(openPlanEditor){
    openPlanEditor.addEventListener('click', ()=>{ window.location.href='lesson_plan.html'; });
  }

  // close on ESC
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeViewWindow(); });
});
