<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { current_account } from "../store.js";
    import { Avatar } from "@skeletonlabs/skeleton";

    let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	});

    onMount(() => {
        const entries = performance.getEntriesByType('navigation');
        const isReload = entries.some(entry => {
            return (entry as PerformanceNavigationTiming).type === 'reload';
        });
        if (!sessionStorage.getItem('visited')) {
            sessionStorage.setItem('visited', 'true');
            goto('/login');
        }
    });
</script>

<style>

    .login-detection{
        text-align: center;
        margin: 50px;
    }
    
    #rickroll{
        display: block;
        margin-left: auto;
        margin-right: auto;

    }
    .chat{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

    .chat-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        max-width: 50%;
        margin: auto;
    }

    .image-container {
        display: inline-flex; 
        gap: 20px;
        vertical-align: middle;
    }

    .image-inline {
        width: 20%;
        vertical-align: middle;
    }
    .message-content {
        max-width: calc(100% - 4rem);
        overflow-wrap: anywhere;
        word-wrap: break-word;
    }
    .chat-bubble {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px;
        border-radius: 10px;
        max-width: 100%;
    }

</style>

<!-- <p in:fly={{ y: 20 }} >Home page!</p> -->
{#if local_current_account}
<h3 class="h3 variant-ghost-primary" style="text-align: center; margin: 20px auto; width: 10%;"> Staff</h3>
<div class="chat">
    <div class="chat-container">
        <div class="rid grid-cols-2 md:grid-cols-4 gap-2">
            <div class="grid grid-cols-[auto_1fr] gap-2">
                <div class="chat-bubble">
                    <a href="https://github.com/Akinom0318">
                        <Avatar src="src\lib\images\staff_pics\wtf.jpg" width="w-14" />          
                    </a>
                    <div class="message-content">
                        <div class="card p-2 variant-soft rounded-tl-none space-y-2">
                            <header class="flex justify-between items-center">
                                <p class="font-bold">Akinom</p>
                                <small class="opacity-50">01:50</small>
                            </header>
                            <p>欸，主頁面超級空欸怎麼辦?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-[1fr_auto] gap-2">
            <div class="card p-4 rounded-tr-none space-y-2 green">
                <header class="flex justify-between items-center">
                    <p class="font-bold">KJC</p>
                    <small class="opacity-50">01:54</small>
                </header>
                    <p>羅傑說你是2486，<span><a href="https://www.youtube.com/@roger1446/videos" style="color: skyblue;">https://www.youtube.com/@roger1446/videos</a></span></p>
            </div>
            <a href="https://github.com/KJC777">
                <Avatar src="src\lib\images\staff_pics\kjc.jpg" width="w-14" />
            </a>
        </div>
        <div class="grid grid-cols-[1fr_auto] gap-2">
            <div class="card p-4 rounded-tr-none space-y-2 green">
                <header class="flex justify-between items-center">
                    <p class="font-bold">SunGJ</p>
                    <small class="opacity-50">01:55</small>
                </header>
                <p>放Towa直播台連結:<span><a href="https://www.youtube.com/@TokoyamiTowa/videos" style="color: skyblue;">https://www.youtube.com/@TokoyamiTowa/videos</a></span></p>
            </div>
            <a href="https://github.com/SunGj921028">
                <Avatar src="src\lib\images\staff_pics\sungj.jpg" width="w-14" />
            </a>
        </div>
        <div class="grid grid-cols-[1fr_auto] gap-2">
            <div class="card p-4 rounded-tr-none space-y-2 green">
                <header class="flex justify-between items-center">
                    <p class="font-bold">NotPotato</p>
                    <small class="opacity-50">01:57</small>
                </header>
                <b>
                    <p>
                        FUMO!!!!!!!!!!!!!!
                        <span class="image-container">
                            <img src="src\lib\images\fumo.jpg" alt="Fumo 1" class="image-inline">
                            <img src="src\lib\images\fumo2.jpg" alt="Fumo 2" class="image-inline">
                            <img src="src\lib\images\fumo3.jpg" alt="Fumo 3" class="image-inline">
                            <img src="src\lib\images\fumo4.jpg" alt="Fumo 4" class="image-inline">
                        </span>
                    </p>
                </b>                
            </div>
            <a href="https://github.com/whatever961">
                <Avatar src="src\lib\images\staff_pics\notpotato.jpg" width="w-14" />
            </a>
        </div>
    </div>
</div>
{:else}
    <div class="login-detection">
        <aside class="alert variant-ghost-tertiary" in:fly={{ y: 20 }}>
            <div class="alert-message">
                <h2 class="h2">
                    Oh no! It seems you haven't log in!
                </h2>
                <img src="src\lib\images\rickroll.png" id="rickroll" alt="Get RickRoll!" width="30%" height="30%">
            </div>
        </aside>        
    </div>
{/if}
