<template>
    <q-card class="col-8" flat bordered  style="min-width: 280px; min-height: 80dvh;">
        <q-card-section>
            <q-skeleton type="rect" />
        </q-card-section>

        <q-separator />

        <q-card-section>
            <div class="row no-wrap items-center">
                <div  class="col-8 q-mr-xs">
                    <q-skeleton type="text" />
                </div>
                <div class="col items-center">
                    <q-skeleton type="text" />
                </div>
            </div>
            <q-skeleton type="text" />
            <q-skeleton type="text" />
            <q-skeleton type="text" />
            <q-skeleton type="text" />
            <q-skeleton type="text" />
        </q-card-section>

        <q-card-section>
            <q-skeleton type="text" />
            <q-skeleton class="full-width" height="100px" />
        </q-card-section>

        <q-card-section>
            <q-skeleton type="QBtn" style="min-width: 200px;" />
        </q-card-section>
    </q-card>

</template>


