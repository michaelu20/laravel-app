import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
}: PageProps<{}>) {
    return (
        <>
            <Head title="Welcome" />
            <section className='bg-pink-500'>
                <section>
                    <header>
                        Uzo's Dating App
                    </header>
                </section>
                <main>
                    <section>
                        Date here .
                    </section>
                </main>
            </section>
        </>
    );
}
