<template>
  <v-container class="d-flex flex-column align-center w-100">
    <BackButton />
    <h1 class="my-4 text-center text-primary">Code Notes</h1>
    <v-btn color="primary" dark @click="openNewNoteDialog" class="mb-4">Add +</v-btn>
    <v-dialog v-model="showDialog" max-width="600">
      <v-card color="indigo darken-4">
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="note.title" label="Title"></v-text-field>
            <v-select 
              v-model="note.language"
              :items="languages"
              item-text="text"
              label="Language"
              return-object
              :item-title="item => item.text"
              :item-value="item => item"
            ></v-select>
            <v-textarea v-model="note.content" label="</>" auto-grow></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="white--text">
          <v-spacer></v-spacer>
          <v-btn color="blue-grey darken-3" text @click="closeDialog">Cancel</v-btn>
          <v-btn class="bg-green darken-2" @click="saveNote">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="w-100" justify="center">
      <v-col cols="12" md="4" lg="3" v-for="(note, index) in notes" :key="index" class="m-2" >
        <v-card class="pa-2 d-flex flex-column align-center color-white" :style="{ backgroundColor: note.color }">
          <v-card-title class="text-center text-wrap text-h5"> {{ note.title }} </v-card-title>
          <v-icon size="36"> {{ note.language.icon }} </v-icon>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn text @click="editNote(index)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
            <v-btn icon @click.stop="deleteNote(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" timeout="2000" color="green" class="d-flex justify-center align-end w-10">
      Note saved!
    </v-snackbar>
  </v-container>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'CodeNotes',
  setup() {
    const showDialog = ref(false);
    const notes = ref([]);
    const note = ref({ title: '', content: '', language: { text: '', icon: '' } });
    const dialogTitle = ref('Add Code');
    const languages = ref([
      { text: 'HTML', icon: 'mdi-language-html5' },
      { text: 'CSS', icon: 'mdi-language-css3' },
      { text: 'JavaScript', icon: 'mdi-language-javascript' }
    ]);
    const languageColors = {
      HTML: '#ff5733',
      CSS: '#03A1FC',
      JavaScript: '#DED009'
    };
    const editingIndex = ref(null);
    const snackbar = ref(false);

    const openNewNoteDialog = () => {
      note.value = { title: '', content: '', language: { text: '', icon: '' } };
      dialogTitle.value = 'Add Code';
      editingIndex.value = null;
      showDialog.value = true;
    };

    const closeDialog = () => {
      showDialog.value = false;
    };

    const saveNote = () => {
      note.value.color = languageColors[note.value.language.text] || '';  /* note background color HTML, CSS and JS */
      if (editingIndex.value !== null) {
        notes.value[editingIndex.value] = { ...note.value };
      } else {
        notes.value.push({ ...note.value });
      }
      saveToLocalStorage();
      closeDialog();
      snackbar.value = true;
    };

    const editNote = (index) => {
      note.value = { ...notes.value[index] };
      dialogTitle.value = 'Edit Note';
      editingIndex.value = index;
      showDialog.value = true;
    };

    const deleteNote = (index) => {
      notes.value.splice(index, 1);
      saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
      localStorage.setItem('codeNotes', JSON.stringify(notes.value));
    };

    const loadFromLocalStorage = () => {
      const storedNotes = localStorage.getItem('codeNotes');
      if (storedNotes) {
        notes.value = JSON.parse(storedNotes);
      }
    };

    // Load notes when the component is mounted
    onMounted(() => {
      document.body.style.background = 'linear-gradient(to right, #4F4F92, #2D2D52)';
      loadFromLocalStorage();
    });

    // Reset the background when the component is removed
    onUnmounted(() => {
      document.body.style.background = '';
    });

    return {
      showDialog,
      notes,
      note,
      dialogTitle,
      openNewNoteDialog,
      languages,
      closeDialog,
      saveNote,
      editNote,
      deleteNote,
      snackbar,
    };
  },
};
</script>
