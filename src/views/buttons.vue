<template>
  <v-container>
    <BackButton />
      <h1 class="my-4 text-center text-primary">Buttons</h1>
    <v-row>
      <v-col v-for="(button, index) in buttons" :key="index" cols="6" md="3" class="d-flex flex-column align-center">
        <v-btn :class="button.class" class="my-4" @click="showCode(button)">
          {{ button.label }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="selectedButton" class="d-flex justify-center align-center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
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
        .gradient-btn { background: linear-gradient(to right, #0000ff, #09cbfb); color: black; transition: 0.3s ease-in-out; }
        .gradient-btn:hover { background-color: #0056b3; }` },
        { label: 'Shadow', class: 'shadow-button', css:`.shadow-button { background-color: #333; color: white; box-shadow: 0px  4px 6px rgba(0, 0, 0, 0.1); transition: box-shadow 0.3s ease; }
        .shadow-button:hover { box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2); }` },
        { label: 'Scale', class: 'scale-button',  css:`.scale-button { background-color: #28a745; color: white; transition: transform 0.3s ease;}
        .scale-button:hover { transform: scale(1.1); } }
        .shadow-button:hover { box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2); }` },
        { label: 'Slow Hover', class: 'slow-hover-button',  css:`.slow-hover-button { background-color: #17a2b8; color: white;transition: background-color 1s ease; }
        .slow-hover-button:hover { background-color: #138496; }` },
        { label: 'Glow', class: 'glow-button',  css:`.glow-button { background-color: #6610f2; color: white; box-shadow: 0 0 5px #6610f2, 0 0 15px #6610f2, 0 0 30px #6610f2, 0 0 50px #6610f2; transition: box-shadow 0.3s ease; }
        .glow-button:hover { box-shadow: 0 0 20px #6610f2, 0 0 40px #6610f2, 0 0 60px #6610f2, 0 0 100px #6610f2; }` },
        { label: '3D', class: 'button-3d', css:`.button-3d { background-color: #17a2b8; color: white; box-shadow: 0 5px #138496, 0 10px #117a8b; transition: box-shadow 0.3s ease; }
        .button-3d:hover { box-shadow: 0 2px #138496, 0 5px #117a8b; }` },
        { label: 'Outline', class: 'outline-button', css:`.outline-button { background-color: transparent; border: 2px solid #007BFF; color: #007BFF; transition: background-color 0.3s ease; }
        .outline-button:hover { background-color: #007BFF; color: white; }` }
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
    transition: 1.3s ease-in-out;
}
.gradient-button:hover {
    background: linear-gradient(to left, #0000ff, #09cbfb);
}

.shadow-button {
    background-color: #333;
    color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}
.shadow-button:hover {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
}

.scale-button {
    background-color: #28a745;
    color: white;
    transition: transform 0.3s ease;
}
.scale-button:hover {
    transform: scale(1.1);
}

.slow-hover-button {
    background-color: #17a2b8;
    color: white;
    transition: background-color 1s ease;
}
.slow-hover-button:hover {
    background-color: #138496;
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
</style>
