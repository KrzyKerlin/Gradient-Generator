<template>
  <v-container class="d-flex flex-column align-center w-100">
    <BackButton />
    <h1 class="my-4 text-center text-indigo-darken-4">Code Notes</h1>
    <v-btn color="primary" dark @click="openNewNoteDialog" class="mb-4">Add Note</v-btn>
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="note.title" label="Title"></v-text-field>
            <v-textarea v-model="note.content" label="</>" auto-grow></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveNote">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="w-100" justify="center">
      <v-col cols="6" md="3" v-for="(note, index) in notes" :key="index">
        <v-card class="d-flex flex-column align-center">
          <v-card-title>{{ note.title }}
            <v-spacer></v-spacer>
            </v-card-title>
              <v-card-text>{{ note.content }}</v-card-text>
            <v-card-actions>
            <v-btn text @click="editNote(index)">Edit</v-btn>
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
import { ref } from 'vue';

export default {
  name: 'CodeNotes',
  setup() {
    const showDialog = ref(false);
    const notes = ref([]);
    const note = ref({ title: '', content: '' });
    const dialogTitle = ref('Add Code');
    const editingIndex = ref(null);
    const snackbar = ref(false);

    const openNewNoteDialog = () => {
      note.value = { title: '', content: '' };
      dialogTitle.value = 'Add Code';
      editingIndex.value = null;
      showDialog.value = true;
    };

    const closeDialog = () => {
      showDialog.value = false;
    };

    const saveNote = () => {
      if (editingIndex.value !== null) {
        notes.value[editingIndex.value] = { ...note.value };
      } else {
        notes.value.push({ ...note.value });
      }
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
    };

    return {
      showDialog,
      notes,
      note,
      dialogTitle,
      openNewNoteDialog,
      closeDialog,
      saveNote,
      editNote,
      deleteNote,
      snackbar,
    };
  },
};
</script>
