<template>
  <div class="white--text wallet--wrapper">
    <div class="wallet-inner--wrap">
      <div class="wallet-item--wrap">
        <div class="item-line">
          <v-icon color="white">
            {{ icons.DIAMOND_MDI }}
          </v-icon>
        </div>
        <div class="item-line balance">
          {{ diamondsBalText }}
        </div>
        <div class="item-line symbol">
          Diamonds
        </div>
      </div>
      <div class="wallet-item--wrap">
        <div class="item-line">
          <v-icon color="white">
            {{ icons.BTS_MDI }}
          </v-icon>
        </div>
        <div class="item-line balance">
          {{ btsBalText }}
        </div>
        <div class="item-line symbol">
          BTs
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MessageController from '@/popup/controllers/message-controller';

export default {
  name: 'WGWalletPannel',
  computed: {
    ...mapGetters('settings', ['icons']),
    ...mapState(['dense', 'wallet', 'nickname']),
    ...mapGetters(['shortAddress', 'networkColor']),
    ...mapGetters('acc', ['diamondsBalText', 'ethBalText', 'btsBalText']),
  },
  data() {
    return {
      defToken: true,
    };
  },
  methods: {
    openExtURL() {
      const subpath = 'popup/popup.html';
      const url = this.$browser.extension.getURL(subpath);
      console.log(subpath);
      console.log(this.$browser.tabs);

      chrome.tabs.create({ active: true, url: url }, function (tab) {
        console.log(tab);
        //todo notify backend
      });
    },
    async toggleToken() {
      this.$store.dispatch('acc/loadBalances');
      this.defToken = !this.defToken;
    },
    async locking() {
      const controller = new MessageController();
      controller
        .logout()
        .then(async (initState) => {
          await this.$store.dispatch('setLoginError');
          await this.$store.dispatch('updateInitState', initState);
          this.$router.push({ path: '/signin' });
        })
        .catch(async (err) => {
          await this.$store.dispatch('setLoginError');
        });
    },
  },
  async mounted() {
    await this.$store.dispatch('acc/loadBalances');
    console.log(await this.$store.getters['acc/ethBalText']);
  },
};
</script>
<style lang="css" scoped>
.wallet--wrapper {
  width: 100%;
  height: 160px;
  /* background: linear-gradient(-30deg, #4f38a4, #a244bc 45%, #4f38a4 45%) #4f38a4; */
  background: #ffffff;
  display: flex;
}

.wallet-inner--wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1;
  margin: 24px;
  padding: 4px 8px;
  background: linear-gradient(217deg, #86b3e7 0%, #6fa0ef 100%, #6fa0ef 100%);
  border-radius: 16px;
}

.wallet-item--wrap {
  display: flex;
  flex-direction: column;
  flex: 1 1 50%;
  align-self: center;
}

.wallet-item--wrap.item-line {
  width: 100%;
  justify-content: center;
}

.item-line.balance {
  font-size: 26px;
  font-family: SFProText-Semibold, SFProText;
  font-weight: 600;
}

.item-line.symbol {
  font-size: 14px;
  font-family: SFProText-Semibold, SFProText;
  font-weight: 300;
}

.wallet--wrapper .inner-nickname {
  font-size: 1.75rem;
  padding: 1rem auto;
}
.wallet--wrapper .inner-wallet {
  font-size: 0.75rem;
  margin: 0.5rem auto;
}
</style>
