reduced = EPI_18921_531_bb20_0M_210405_234323(1).reduced_rx;

mags = reduced.mag{1};
phases = reduced.phase{1};
pbfreqs = reduced.rxSubcarrierPBFreq;

range = 1:30;


figureSize = [500 500 1000 400];
axesPosition1 = [0.065 0.54 0.93 0.39];
axesPosition2 = [0.065 0.14 0.93 0.39];


fig_mag = figure('Position', figureSize);
axes_mag = axes('Parent', fig_mag, 'FontSize', 18, 'Position', axesPosition1);
hold(axes_mag, 'on');
plot(axes_mag, pbfreqs(range, :)', mag2db(mags(range,:)'), 'LineWidth', 3);
title(axes_mag, '30 overlapped 20 MHz-bandwidth CSI measurements over a 160 MHz spectrum by QCA9300');

% Create xlabel
% xlabel(axes_mag, 'Carrier Frequency (MHz)');
xlim(axes_mag,[4890000000 5055000000]);
ylabel(axes_mag, 'Magnitude (dB)');
ylim(axes_mag,[38 52]);
box(axes_mag,'on');
hold(axes_mag,'off');

set(axes_mag,'XGrid', 'on','XTick',...
    [4900000000 4920000000 4940000000 4960000000 4980000000 5000000000 5020000000 5040000000],...
    'XTickLabel',{'4900','4920','4940','4960','4980','5000','5020','5040'},'YTick',[40 45 50]);


axes_phase = axes('Parent', fig_mag, 'FontSize', 18, 'Position', axesPosition2);

hold(axes_phase, 'on');
plot(axes_phase, pbfreqs(range,:)', phases(range,:)', 'LineWidth', 3);
xlim(axes_phase, [4890000000 5055000000]);
ylim(axes_phase, [-1 1.5])
xlabel(axes_phase, 'Carrier Frequency (MHz)');
ylabel('Phase (rad)');
set(axes_phase, 'XGrid', 'on', 'XTick',...
    [4900000000 4920000000 4940000000 4960000000 4980000000 5000000000 5020000000 5040000000],...
    'XTickLabel',{'4900','4920','4940','4960','4980','5000','5020','5040'},'YTick',[-0.5 0 0.5]);
box(axes_phase, 'on');
hold(axes_phase, 'off');

save2pdf('cf_scan.pdf', fig_mag);
