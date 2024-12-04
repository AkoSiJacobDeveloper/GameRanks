<template>
  <div class="admin-home container-fluid">
    <div class="d-flex justify-content-between">
      <Header />
      <div class="p-2">
        <LogoutBtn @click="logoutBtn" />
      </div>
    </div>

    <div class="container-fluid">
      <h1 class="header">Gaming Leaderboard</h1>
      <button class="btn btn-primary mb-3 addBtn" @click="openAddPlayerModal">Add Player</button>

      <table class="table">
        <thead>
          <tr class="table-row">
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Games Played</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players" :key="player.id">
            <td>{{ index + 1 }}</td>
            <td>{{ player.name }}</td>
            <td>{{ player.score }}</td>
            <td>{{ player.gamesPlayed }}</td>
            <td class="d-flex gap-2">
              <button class="btn btn-sm btn-warning w-25 p-2" @click="openEditPlayerModal(player)">
                Edit
              </button>
              <button class="btn btn-sm btn-danger w-25 p-2" @click="deletePlayer(player.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="showModal" class="modal-backdrop">
        <div class="modal-content p-4">
          <h2 class="modal-heading">{{ isEditing ? 'Edit Player' : 'Add Player' }}</h2>
          <form @submit.prevent="savePlayer">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                v-model="currentPlayer.name"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="score">Score</label>
              <input
                id="score"
                v-model.number="currentPlayer.score"
                type="number"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="gamesPlayed">Games Played</label>
              <input
                id="gamesPlayed"
                v-model.number="currentPlayer.gamesPlayed"
                type="number"
                class="form-control"
                required
              />
            </div>
            <button type="submit addBtn" class="btn btn-success w-100 my-3">
              {{ isEditing ? 'Save Changes' : 'Add Player' }}
            </button>
            <button class="btn btn-secondary w-100 cancelBtn" @click="closeModal">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { getAuth, signOut } from 'firebase/auth' // Import Firebase authentication methods
import Header from '../Header/Header.vue'
import LogoutBtn from '../Buttons/LogoutBtn.vue'

export default {
  components: { Header, LogoutBtn },
  data() {
    return {
      webTitle: 'GameRanks',
      players: [],
      showModal: false,
      isEditing: false,
      currentPlayer: {
        id: null,
        name: '',
        score: 0,
        gamesPlayed: 0,
      },
    }
  },
  methods: {
    fetchPlayers() {
      const playersRef = collection(db, 'players')
      onSnapshot(playersRef, (snapshot) => {
        this.players = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => b.score - a.score)
      })
    },
    openAddPlayerModal() {
      this.resetPlayerForm()
      this.showModal = true
      this.isEditing = false
      // Load any saved form data from localStorage
      this.loadPlayerFormFromStorage()
    },
    openEditPlayerModal(player) {
      this.currentPlayer = { ...player }
      this.showModal = true
      this.isEditing = true
    },
    closeModal() {
      this.resetPlayerForm()
      this.showModal = false
      // Optionally clear stored form data if modal is closed
      this.clearPlayerFormInStorage()
    },
    resetPlayerForm() {
      this.currentPlayer = {
        id: null,
        name: '',
        score: 0,
        gamesPlayed: 0,
      }
    },
    loadPlayerFormFromStorage() {
      const savedData = localStorage.getItem('playerFormData')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        this.currentPlayer.name = parsedData.name || ''
        this.currentPlayer.score = parsedData.score || 0
        this.currentPlayer.gamesPlayed = parsedData.gamesPlayed || 0
      }
    },
    savePlayerFormToStorage() {
      const formData = {
        name: this.currentPlayer.name,
        score: this.currentPlayer.score,
        gamesPlayed: this.currentPlayer.gamesPlayed,
      }
      localStorage.setItem('playerFormData', JSON.stringify(formData))
    },
    clearPlayerFormInStorage() {
      localStorage.removeItem('playerFormData')
    },
    async savePlayer() {
      const playersRef = collection(db, 'players')
      try {
        if (this.isEditing) {
          const playerDoc = doc(db, 'players', this.currentPlayer.id)
          await updateDoc(playerDoc, {
            name: this.currentPlayer.name,
            score: this.currentPlayer.score,
            gamesPlayed: this.currentPlayer.gamesPlayed,
          })
          alert('Player updated successfully!')
        } else {
          await addDoc(playersRef, {
            name: this.currentPlayer.name,
            score: this.currentPlayer.score,
            gamesPlayed: this.currentPlayer.gamesPlayed,
          })
          alert('Player added successfully!')
        }
        this.closeModal()
      } catch (error) {
        console.error('Error saving player: ', error)
      }
    },
    async deletePlayer(playerId) {
      const playerDoc = doc(db, 'players', playerId)
      try {
        await deleteDoc(playerDoc)
        alert('Player deleted successfully!')
      } catch (error) {
        console.error('Error deleting player: ', error)
      }
    },
    logoutBtn() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          this.$router.push({ name: 'landing-page' })
          window.history.replaceState(null, '', '/landing-page')
          this.clearPlayerFormInStorage() // Clear form data on logout
        })
        .catch((error) => {
          console.error('Error logging out: ', error)
        })
    },
  },
  mounted() {
    this.fetchPlayers()
  },
  watch: {
    'currentPlayer.name': 'savePlayerFormToStorage',
    'currentPlayer.score': 'savePlayerFormToStorage',
    'currentPlayer.gamesPlayed': 'savePlayerFormToStorage',
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/Styles/Styles.scss';
.container-fluid {
  .addBtn {
    font-family: $headline-font;
  }
  .header {
    font-family: $headline-font;
  }

  table {
    background-color: $header-background;
    .table-row {
      font-family: $headline-font;
    }

    td {
      font-family: $texts-font;
      margin-bottom: 0px;
    }
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-content {
      padding: 20px;
      border-radius: 5px;
      width: 400px;
      .modal-heading {
        font-family: $headline-font;
      }
      form {
        label {
          font-family: $texts-font;
        }

        button {
          font-family: $headline-font;
        }
      }
    }
  }
}
</style>
