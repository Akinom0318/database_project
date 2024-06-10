<script lang="ts">
    import { current_account } from "../../../store";

    let local_current_account = "";
    current_account.subscribe((value) => {
        local_current_account = value;
    });

</script>

<style>

</style>

<!-- <div class="text-3xl font-bold text-center pt-3 pb-3">This is the admin page</div> -->

<!-- Try to add some pictures -->


<div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3">
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="src/lib/images/kjc.jpg" alt="">
        </div>
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="src/lib/images/GJ.jpg" alt="">
        </div>
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="src/lib/images/akn.jpg" alt="">
        </div>
        <!-- <div>
            <img class="h-auto max-w-80 rounded-lg" src="src/lib/images/GJ.jpg" alt="">
        </div> -->
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="src/lib/images/not.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="src/lib/images/GJ-2.jpg" alt="">
        </div>
        
    </div>
</div>



<div></div>

