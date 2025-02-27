<template>
  <v-container>
    <BackButton />
      <h1 class="my-4 text-center text-primary">Buttons</h1>
    <v-row>
      <v-col v-for="(button, index) in buttons" :key="index" cols="6" md="3" class="d-flex flex-column align-center">
        <v-btn :class="button.class" class="my-4 text-center" @click="showCode(button)">
          {{ button.label }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="selectedButton" class="d-flex justify-center align-center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="d-flex flex-column justify-center">
              <pre class="text-wrap text-caption">{{ selectedButtonCode }}</pre>
              <v-btn 
                class="absolute top right mt-3"
                color="primary"
                @click="copyToClipboard(selectedButtonCode)"
              >
                <v-icon>mdi-content-copy</v-icon> Copy Code
              </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    // Set the background on component mount
    onMounted(() => {
      document.body.style.background = 'linear-gradient(to right, #80def4, #5db9d0, #0b88a8)';
    });

    // Reset the background when the component is removed
    onUnmounted(() => {
      document.body.style.background = '';
    });

    const buttons = ref([
        { label: 'Simple Btn', class: 'simple-button', css:`
        .simple-button { background-color: #007BFF; color: white; }
        .simple-button:hover { background-color: #0056b3; }` },
        { label: 'Gradient', class: 'gradient-button', css:`
        .gradient-btn { background: linear-gradient(to right, #0000ff, #09cbfb); color: black; border: none; transition: background 1.3s ease-in-out; }
        .gradient-btn:hover { background: linear-gradient(to left, #0000ff, #09cbfb); color: white; }` },
        { label: 'Move', class: 'move-button', css:`.move-button { background-color: #890c82; border: none; border-radius: 5px; transition: transform 0.2s ease; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        .move-button:hover { transform: translateY(-10px); box-shadow: 0 15px 25px rgba(0,0,0,0.2); }` },
        { label: 'Scale', class: 'scale-button',  css:`.scale-button { background-color: #28a745; color: white; transition: transform 0.3s ease;}
        .scale-button:hover { transform: scale(1.1); } }
        .shadow-button:hover { box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2); }` },
        { label: 'Dashed', class: 'dashed-button',  css:`.dashed-button { background: white; color: #6a11cb; border: 2px dashed #6a11cb; }
        .dashed-button:hover { background: #6a11cb; color: white; }` },
        { label: 'Glow', class: 'glow-button',  css:`.glow-button { background-color: #6610f2; color: white; box-shadow: 0 0 5px #6610f2, 0 0 15px #6610f2, 0 0 30px #6610f2, 0 0 50px #6610f2; transition: box-shadow 0.3s ease; }
        .glow-button:hover { box-shadow: 0 0 20px #6610f2, 0 0 40px #6610f2, 0 0 60px #6610f2, 0 0 100px #6610f2; }` },
        { label: '3D', class: 'button-3d', css:`.button-3d { background-color: #17a2b8; color: white; box-shadow: 0 5px #138496, 0 10px #117a8b; transition: box-shadow 0.3s ease; }
        .button-3d:hover { box-shadow: 0 2px #138496, 0 5px #117a8b; }` },
        { label: 'Outline', class: 'outline-button', css:`.outline-button { background-color: transparent; border: 2px solid #007BFF; color: #007BFF; transition: background-color 0.3s ease; }
        .outline-button:hover { background-color: #007BFF; color: white; }` },
        { label: 'Neon', class: 'neon-button', css:`.neon-button { background-color: #111;color: #0f0; border: 2px solid #0f0; border-radius: 5px; padding: 12px 24px;text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 20px #0f0; transition: all 0.3s ease-in-out; }
        .neon-button:hover { background-color: #0f0; color: #111; text-shadow: 0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0; }` },
        { label: 'Ribbon', class: 'ribbon-button', css:`.ribbon-button { background-color: #ff4757; color: white; border: none; border-radius: 5px; padding: 12px 24px;position: relative; overflow: hidden; transition: all 0.3s ease-in-out; }
        .ribbon-button:before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.2); transition: all 0.3s ease-in-out; }
        .ribbon-button:hover:before { left: 100%; }` },
        { label: 'Wavy', class: 'wavy-button', css:`.wavy-button { background-color: #1e90ff; color: white; border: none; border-radius: 5px; padding: 12px 24px; position: relative; overflow: hidden; transition: all 0.3s ease-in-out; }
        .wavy-button:before { content: ''; position: absolute; top: 0; left: 0; width: 100%;height: 100%; background: radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 10%); background-size: 50px 50px; transition: all 0.3s ease-in-out; }
        .wavy-button:hover:before { animation: wavy 1s infinite linear; }
        @keyframes wavy { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }` },
        { label: 'Slide', class: 'slide-button', css:`.slide-button { display: inline-block; font-weight: 700; color: white;border: 3px solid rgb(252, 70, 100); cursor: pointer; position: relative; background-color: transparent;text-decoration: none; overflow: hidden; z-index: 1; }
        .slide-button::before { content: ""; position: absolute; left: 0; top: 0; width: 100%; height: 100%;background-color: rgb(252, 70, 100); transform: translateX(-100%); transition: all .3s; z-index: -1; }
        .slide-button:hover::before { transform: translateX(0); }` },
        { label: 'Rotate', class: 'rotate-button', css:`.rotate-button { background-color: #e83e8c; color: white; border: none;border-radius: 5px; padding: 12px 24px; transition: transform 0.3s ease; }
        .rotate-button:hover { transform: rotate(360deg); }` },
        { label: 'Tilt', class: 'tilt-button', css:`.tilt-button { background-color: #20c997; color: white; border: none;border-radius: 5px; padding: 12px 24px; transition: transform 0.3s ease; }
        .tilt-button:hover { transform: perspective(500px) rotateX(20deg) rotateY(20deg); }` },
        { label: 'Flip', class: 'flip-button', css:`.flip-button { background-color: #ff6b6b; color: white; perspective: 1000px; }
        .flip-button:hover { transform: rotateY(180deg); transition: transform 0.3s ease; }` },
        { label: 'Pulse', class: 'pulse-button', css:`.pulse-button { background-color: #ff4757; color: white; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }` },
        { label: 'Corner', class: 'corner-button', css:`.corner-button { background-color: #007BFF; color: white; border: none;border-radius: 0; padding: 12px 24px; transition: border-radius 0.3s ease; }
        .corner-button:hover { border-radius: 15px; }` },
        { label: 'Comic', class: 'comic-button', css:`.comic-button { background-color: #ff6347; color: #fff; border: 3px solid #000; border-radius: 10px; padding: 12px 24px; font-size: 16px; font-family: 'Comic Sans MS', cursive, sans-serif;position: relative; box-shadow: 5px 5px 0 #000; transition: transform 0.2s, box-shadow 0.2s; }
        .comic-button:hover { transform: translate(-3px, -3px); box-shadow: 8px 8px 0 #000; }` },
        { label: 'Swipe', class: 'swipe-button', css:`.swipe-button { color: #fff; border: 3px solid #c266d3; background-image: linear-gradient(30deg, #c266d3 50%, transparent 50%); background-size: 500px; background-repeat: no-repeat;background-position: 0%; transition: background 300ms ease-in-out; }
        .swipe-button:hover { background-position: 100%; color: #c266d3; }` },
        { label: 'Morph', class: 'morph-button', css:`.morph-button { background-color: #6c757d; color: white; transition: transform 0.3s ease, border-radius 0.3s ease; }
        .morph-button:hover { transform: scale(1.2); border-radius: 50%; }` },
        { label: 'Ripple', class: 'ripple-button', css:`.ripple-button { background-color: #6f42c1; color: white; padding: 12px 24px; font-size: 16px; border: none; border-radius: 5px; overflow: hidden; position: relative; transition: all 0.3s ease-in-out; }
        .ripple-button:hover::before { content: ''; position: absolute; width: 200%; height: 200%; top: 50%; left: 50%;background-color: rgba(255, 255, 255, 0.3); transform: translate(-50%, -50%) scale(0); animation: ripple 0.6s linear; }
        @keyframes ripple { to { transform: translate(-50%, -50%) scale(1); opacity: 0; } }` },
        { label: 'Expand', class: 'expand-button', css:`.expand-button { background-color: #4CAF50; color: white; padding: 12px 24px; font-size: 16px; border: none; border-radius: 5px; transition: width 0.3s ease; }
        .expand-button:hover { width: 100%; }` },
        { label: 'Dotted', class: 'dotted-button', css:`.dotted-button { background-color: #e83e8c; color: white; padding: 12px 24px; font-size: 16px; border: none; border-radius: 5px; position: relative; }
        .dotted-button::before { content: ''; position: absolute; top: 50%; left: 0; width: 10px; height: 10px;background-color: white; border-radius: 50%; transition: transform 0.3s ease; }
        .dotted-button:hover::before { transform: translateX(100%); }` },
        { label: 'C-Button', class: 'c-button', css:`.c-button { padding: 1em 2em; border: none; border-radius: 5px; font-weight: bold; letter-spacing: 5px; text-transform: uppercase; cursor: pointer; color: #2c9caf; transition: all 1000ms; font-size: 15px; position: relative; overflow: hidden; outline: 2px solid #2c9caf; }
        .c-button:hover { color: #ffffff; transform: scale(1.1); outline: 2px solid #70bdca; box-shadow: 4px 5px 17px -4px #268391; } .c-button::before { content: ""; position: absolute; left: -50px; top: 0; width: 0; height: 100%; background-color: #2c9caf; transform: skewX(45deg); z-index: -1; transition: width 1000ms; }
        .c-button:hover::before { width: 250%; }` },
        { label: 'Simple2', class: 'button-simple2', css:`.button-simple2 { background-color: #f3f7fe; color: #3b82f6; border: none; cursor: pointer; border-radius: 8px; width: 100px; height: 45px; transition: 0.3s; }
        .button-simple2:hover { background-color: #3b82f6; box-shadow: 0 0 0 5px #3b83f65f; color: #fff; }` },
        { label: 'Border Hover', class: 'button-border', css:`.button-border { padding: 15px; border-radius: 5px; outline: 2px solid #2835ba; outline-offset: 0px; background: #2835ba; border: 0; color: white; transition: all .1s ease-in-out; cursor: pointer; }
        .button-border:hover { outline-offset: 3px; outline: 3px solid #2835ba; }` },
        { label: 'B Move', class: 'border-move', css:`.border-move { position: relative; background: #FBD148; box-sizing: border-box; border: 0; outline: 0; padding: 1rem 3rem; font-size: 1em; cursor: pointer; transition: .25s ease; }
        .border-move::before { position: absolute; content: ''; box-sizing: border-box; top: 0; left: 0; transform: translate(-5px, -5px); width: 100%; height: 100%; border: 1px solid rgb(84, 84, 84); transition: .25s ease; }
        .border-move:hover { transform: translate(-5px, -5px); }
        .border-move:hover::before { transform: translate(5px, 5px); }` },
        { label: 'Border', class: 'border-gradient', css:`.border-gradient { position: relative; display: inline-flex;justify-content: center; align-items: center; padding: 15px 20px; cursor: pointer; border-width: 4px; border-style: solid; border-image: linear-gradient(to right, darkblue, darkorchid) 1; color: darkblue; overflow: hidden; background: none; transition: color 0.5s ease, border-color 0.5s ease; },
        .border-gradient:hover { color: darkorchid; }` },
        { label: 'Shadow', class: 'shadow3D-button', css:`.shadow3D-button { padding: 10px 20px; font-weight: 700; background: rgb(255, 255, 255); color: blueviolet; cursor: pointer; border-radius: 0.5rem; border-bottom: 2px solid blueviolet; border-right: 2px solid blueviolet; border-top: 2px solid white; border-left: 2px solid white;transition-duration: 1s; transition-property: border-top, border-left, border-bottom, border-right, box-shadow; }
        .shadow3D-button:hover { border-top: 2px solid blueviolet; border-left: 2px solid blueviolet; border-bottom: 2px solid rgb(238, 103, 238); border-right: 2px solid rgb(238, 103, 238); box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px }` },
        { label: 'Brightness', class: 'brightness-button', css:`.brightness-button { background: linear-gradient(to top, #30cfd0, #330867); color: white; border-radius: 10px; padding: 10px 20px; }
        .brightness-button:hover { filter: brightness(1.3); }` },
        { label: 'Glass', class: 'glassmorphism-button', css:`.glassmorphism-button { background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(40px); color: black; padding: 10px 20px;border-radius: 10px; transition: background 0.3s ease, border 0.3s ease; }
        .glassmorphism-button:hover { border: 1px solid rgba(255, 255, 255, 0.5); backdrop-filter: blur(0px); }` }
    ]);

    const selectedButton = ref(null);
    const selectedButtonCode = ref('');

    const showCode = (button) => {
      selectedButton.value = button;
      selectedButtonCode.value = button.css.trim();
    };

    // Copy Button CSS code
    const copyToClipboard = () => {
      // Check if writeText is supported
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(selectedButtonCode.value).then(() => {
        const button = document.getElementById('copyCode');
        if (button) {
          button.textContent = 'Copied :)';
          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
          }, 2000);
        }
      });
      } else {
        // Fallback method for browsers that do not support writeText
        const textArea = document.createElement('textarea');
        textArea.value = selectedButtonCode.value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const button = document.getElementById('copyCode');
        if (button) {
          button.textContent = 'Copied :)';
          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
          }, 2000);
        }
      }
    };

    return {
      buttons,
      selectedButton,
      selectedButtonCode,
      showCode,
      copyToClipboard
    };
  }
}

</script>

<style scoped>
.simple-button {
  background-color: #007BFF;
  color: white;
}
.simple-button:hover {
  background-color: #0056b3;
}

.gradient-button {
  background: linear-gradient(to right, #0000ff, #09cbfb);
  color: black;
  border: none;
  transition: background 1.3s ease-in-out;
}
.gradient-button:hover {
  background: linear-gradient(to left, #0000ff, #09cbfb);
  color: white;
}

.move-button {
  background-color: #890c82;
  color: white;
  border: none;
  border-radius: 5px;
  transition: transform 0.2s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.move-button:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.2);
}

.scale-button {
  background-color: #28a745;
  color: white;
  transition: transform 0.3s ease;
}
.scale-button:hover {
  transform: scale(1.1);
}

.dashed-button {
  background: white;
  color: #6a11cb;
  border: 2px dashed #6a11cb; 
}
.dashed-button:hover {
  background: #6a11cb;
  color: white;  
}

.glow-button {
  background-color: #6610f2;
  color: white;
  box-shadow: 0 0 5px #6610f2, 0 0 15px #6610f2, 0 0 30px #6610f2, 0 0 50px #6610f2;
  transition: box-shadow 0.3s ease;
}
.glow-button:hover {
  box-shadow: 0 0 20px #6610f2, 0 0 40px #6610f2, 0 0 60px #6610f2, 0 0 100px #6610f2;;
}

.button-3d {
  background-color: #17a2b8;
  color: white;
  box-shadow: 0 5px #138496, 0 10px #117a8b;
  transition: box-shadow 0.3s ease;
}
.button-3d:hover {
  box-shadow: 0 2px #138496, 0 5px #117a8b;
}

.outline-button {
  background-color: transparent;
  border: 2px solid #007BFF;
  color: #007BFF;
  transition: background-color 0.3s ease;
}
.outline-button:hover {
  background-color: #007BFF;
  color: white;
}

.neon-button {
  background-color: #111;
  color: #0f0;
  border: 2px solid #0f0;
  border-radius: 5px;
  padding: 10px 20px;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 20px #0f0;
  transition: all 0.3s ease-in-out;
}
.neon-button:hover {
  background-color: #0f0;
  color: #111;
  text-shadow: 0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0;
}

.ribbon-button {
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
.ribbon-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;
}
.ribbon-button:hover:before {
  left: 100%;
}

.wavy-button {
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
.wavy-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 10%);
  background-size: 50px 50px;
  transition: all 0.3s ease-in-out;
}
.wavy-button:hover:before {
  animation: wavy 1s infinite linear;
}
@keyframes wavy {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.slide-button {
  display: inline-block;
  font-weight: 700;
  color: white;
  border: 3px solid rgb(252, 70, 100);
  cursor: pointer;
  position: relative;
  background-color: transparent;
  text-decoration: none;
  overflow: hidden;
  z-index: 1;
}
.slide-button::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(252, 70, 100);
  transform: translateX(-100%);
  transition: all .3s;
  z-index: -1;
}
.slide-button:hover::before {
  transform: translateX(0);
}

.rotate-button {
  background-color: #e83e8c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  transition: transform 0.3s ease;
}
.rotate-button:hover {
  transform: rotate(360deg);
}

.tilt-button {
  background-color: #20c997;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  transition: transform 0.3s ease;
}
.tilt-button:hover {
  transform: perspective(500px) rotateX(20deg) rotateY(20deg);
}

.flip-button {
  background-color: #ff6b6b;
  color: white;
  perspective: 1000px;
}
.flip-button:hover {
  transform: rotateY(180deg);
  transition: transform 0.3s ease;
}

.pulse-button {
  background-color: #ff4757;
  color: white;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.corner-button {
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 0;
  padding: 12px 24px;
  transition: border-radius 0.3s ease;
}
.corner-button:hover {
  border-radius: 15px;
}

.comic-button {
  background-color: #ff6347;
  color: #fff;
  border: 3px solid #000;
  border-radius: 10px;
  padding: 15px 25px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  position: relative;
  box-shadow: 5px 5px 0 #000;
  transition: transform 0.2s, box-shadow 0.2s;
}
.comic-button:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 #000;
}

.swipe-button {
   color: #fff;
   border: 3px solid #c266d3;
   background-image: linear-gradient(30deg, #c266d3 50%, transparent 50%);
   background-size: 500px;
   background-repeat: no-repeat;
   background-position: 0%;
   transition: background 300ms ease-in-out;  
}
.swipe-button:hover {
  background-position: 100%;
  color: #c266d3;  
}

.morph-button {
  background-color: #6c757d;
  color: white;
  transition: transform 0.3s ease, border-radius 0.3s ease;
}
.morph-button:hover {
  transform: scale(1.2);
  border-radius: 50%;
}

.ripple-button {
  background-color: #6f42c1;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;
}
.ripple-button:hover::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: 50%;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%) scale(0);
  animation: ripple 0.6s linear;
}
@keyframes ripple {
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

.expand-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  transition: transform 0.3s ease;  
}
.expand-button:hover {
  width: 75%;
}

.dotted-button {
  background-color: #e83e8c;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  position: relative;
}
.dotted-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
.dotted-button:hover::before {
  transform: translateX(100%);
}

/* From Uiverse.io by vikiWayne */ 
.c-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  cursor: pointer;
  color: #2c9caf;
  transition: all 1000ms;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  outline: 2px solid #2c9caf;
}
.c-button:hover {
  color: #ffffff;
  transform: scale(1.1);
  outline: 2px solid #70bdca;
  box-shadow: 4px 5px 17px -4px #268391;
}
.c-button::before {
  content: "";
  position: absolute;
  left: -50px;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #2c9caf;
  transform: skewX(45deg);
  z-index: -1;
  transition: width 1000ms;
}

.c-button:hover::before {
  width: 250%;
}

/* From Uiverse.io by Mhyar-nsi */ 
.button-simple2 {
  background-color: #f3f7fe;
  color: #3b82f6;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  width: 100px;
  height: 45px;
  transition: 0.3s;
}
.button-simple2:hover {
  background-color: #3b82f6;
  box-shadow: 0 0 0 5px #3b83f65f;
  color: #fff;
}

.button-border {
  padding: 5px 15px;
  border-radius: 5px;
  outline: 2px solid #2835ba;
  outline-offset: 0px;
  background: #2835ba;
  border: 0;
  color: white;
  transition: all .1s ease-in-out;
  cursor: pointer;
}
.button-border:hover {
  outline-offset: 3px;
  outline: 3px solid #2835ba;
}

/* From Uiverse.io by sunnyshaikh */ 
.border-move {
  position: relative;
  background: #FBD148;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: .25s ease;
}
.border-move::before {
  position: absolute;
  content: '';
  box-sizing: border-box;
  top: 0;
  left: 0;
  transform: translate(-5px, -5px);
  width: 100%;
  height: 100%;
  border: 1px solid rgb(84, 84, 84);
  transition: .25s ease;
}
.border-move:hover {
  transform: translate(-5px, -5px);
}
.border-move:hover::before {
  transform: translate(5px, 5px);
}

.border-gradient {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  padding: 15px 20px;
  cursor: pointer;
  border-width: 4px;
  border-style: solid;
  border-image: linear-gradient(to right, darkblue, darkorchid) 1;
  color: darkblue;
  overflow: hidden;
  background: none;
  transition: color 0.5s ease, border-color 0.5s ease;
}
.border-gradient:hover {
  color: darkorchid;
}

/* From Uiverse.io by alexreyes091 */ 
.shadow3D-button {
  padding: 10px 20px;
  font-weight: 700;
  background: rgb(255, 255, 255);
  color: blueviolet;
  cursor: pointer;
  border-radius: 0.5rem;
  border-bottom: 2px solid blueviolet;
  border-right: 2px solid blueviolet;
  border-top: 2px solid white;
  border-left: 2px solid white;
  transition-duration: 1s;
  transition-property: border-top, border-left, border-bottom, border-right,
    box-shadow;
}
.shadow3D-button:hover {
  border-top: 2px solid blueviolet;
  border-left: 2px solid blueviolet;
  border-bottom: 2px solid rgb(238, 103, 238);
  border-right: 2px solid rgb(238, 103, 238);
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px;
}

.brightness-button {
  background: linear-gradient(to top, #30cfd0, #330867);
  color: white;
  border-radius: 10px;
  padding: 10px 20px; 
}
.brightness-button:hover {
  filter: brightness(1.3);  
}

.glassmorphism-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(40px);
  color: black;
  padding: 10px 20px;
  border-radius: 10px;
  transition: background 0.3s ease, border 0.3s ease;
}
.glassmorphism-button:hover {
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(0px);
}

.v-card {
  background-color: rgb(46, 46, 116);
  color: #fff;
}

</style>
