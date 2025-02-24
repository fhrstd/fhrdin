// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function fetchAnimations() {
  // Fetch data from Supabase
  const { data: animations, error } = await supabase
    .from('animations') // Using animations table
    .select('target_id, video_url, name'); // Now using video_url instead of gif_url

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const assetsContainer = document.querySelector('#assets-container');
  const entityContainer = document.querySelector('#entity-container');

  // Load WebM videos as assets
  animations.forEach(item => {
    const videoAsset = document.createElement('video');
    videoAsset.setAttribute('id', item.name);
    videoAsset.setAttribute('src', item.video_url);
    videoAsset.setAttribute('loop', 'true');
    videoAsset.setAttribute('autoplay', 'true');
    videoAsset.setAttribute('muted', 'true'); // Required for autoplay
    videoAsset.setAttribute('playsinline', 'true');  
    videoAsset.setAttribute('crossorigin', 'anonymous'); // Prevents CORS issues
    videoAsset.setAttribute('webkit-playsinline', 'true');  
    videoAsset.style.background = 'transparent'; // Ensures transparency
    assetsContainer.appendChild(videoAsset);
  });

  console.log("Assets Loaded:", assetsContainer.innerHTML); // Debugging assets

  // Create MindAR entities with WebM animations
  animations.forEach((elm) => {
    console.log(`Creating entity for ${elm.name} with target ID: ${elm.target_id}`); // Debugging

    const target = document.createElement('a-entity');

    target.innerHTML = `
      <a-entity mindar-image-target="targetIndex: ${elm.target_id}">
        <a-video 
          id="${elm.name}"
          material="shader: transparent-video; src: #${elm.name}; color: #ffcccc; transparent: true"
          width="1" 
          height="1.4"
          position="0 0 0"
          autoplay
          loop
          muted
          crossorigin="anonymous"
          playsinline
        ></a-video>
      </a-entity>
    `;

    entityContainer.appendChild(target);
  });

  console.log("Entities added:", entityContainer.innerHTML); // Debugging entities
}

// Load animations when the page is ready
fetchAnimations();
