type Props = {
	href: string;

	text: string;

	icon: any;
};

export default function StackCard({ href, text, icon }: Props) {
	return (
		<a
			href={href}
			target="_blank"
			class="w-fit px-3 py-2 group rounded border flex gap-2 items-center border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 hover:dark:bg-neutral-800 blend"
			rel="noreferrer"
		>
			<div class="w-5 h-5">{icon}</div>
			<span class="text-sm capitalize text-neutral-500 dark:text-neutral-400 group-hover:text-black group-hover:dark:text-white blend">
				{text}
			</span>
		</a>
	);
}
