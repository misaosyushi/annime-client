<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  layout: 'empty',
  asyncData({ base, redirect, query }) {
    const param: string | (string | null)[] = query.p
    if (param === undefined || typeof param !== 'string') {
      return redirect('/')
    }
    const redirectPath: string = '/' + param.replace(base, '')
    return redirect(redirectPath)
  }
})
</script>
