<template>
  <v-container class="d-flex flex-column align-center w-100">
    <BackButton />
    <h1 class="my-4 text-center text-indigo-darken-4">Code Notes</h1>
    <v-btn color="primary" dark @click="openNewNoteDialog" class="mb-4">Add Note</v-btn>
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline">Title</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-textarea></v-textarea>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-actions>
            <v-btn text @click="openDialog()">View Code</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CodeNotes',
  setup() {
    const showDialog = ref(false);

    const openNewNoteDialog = () => {
      showDialog.value = true; 
    };

    const openDialog = () => {
      showDialog.value = true;
    };

    return {
      showDialog,
      openNewNoteDialog,
      openDialog,
    };
  },
};
</script>

