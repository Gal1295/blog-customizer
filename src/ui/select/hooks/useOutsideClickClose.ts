import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
	event?: 'click' | 'mousedown';
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
	event = 'click',
}: UseOutsideClickClose) => {
	useEffect(() => {
		// Останавливаем эффект, если форма закрыта
		if (!isOpen) return;
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener(event, handleClick);

		return () => {
			window.removeEventListener(event, handleClick);
		};
	}, [isOpen, rootRef, onClose, onChange, event]);
};
