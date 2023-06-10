<script lang="ts">
  import { Chara, getBestCount } from "./logic";

  let level = 250;
  let expRate = 0;

  function buildMessage(level: number, expRate: number, total: number) {
    const ch = new Chara(level, Chara.convertToExp(level, expRate));
    const [count, afterCh, history] = getBestCount(ch, total);
    const h = history
      .map((ch) => {
        if (typeof ch === "number") {
          return "NEW AGE";
        }
        return `${ch.level}레벨(${getExpRateString(ch)}%)`;
      })
      .join(" -> ");
    return (
      `- 총 극성비 ${total}개: 패치 전에 ${count}개, 패치 후에 ${
        total - count
      }개, ` + h
    );
  }

  function getExpRateString(ch: Chara) {
    console.log(ch, Math.floor(ch.getExpRate() * 1000) / 1000)
    return Math.floor(ch.getExpRate() * 1000) / 1000;
  }
</script>

<main>
  <h3>NEW AGE 극성비 먹을까 말까 계산기 (~2023/06/15)</h3>
  ※ 260레벨 이상은 정확하지 않습니다.
  <label>
    현재 레벨
    <input type="number" bind:value={level} min="240" max="269" />
  </label>
  <label>
    현재 경험치 %
    <input type="number" bind:value={expRate} min="0" max="99" />
  </label>
  {#each [1, 2, 3, 4, 5] as i}
    <div>{buildMessage(level, expRate, i)}</div>
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  * {
    line-height: 1.6;
  }
</style>
